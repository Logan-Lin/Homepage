import time
import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        if any(event.src_path.endswith(ext) for ext in ['.md', '.py', '.html', '.css', '.js']):
            print(f"File {event.src_path} has been modified")
            self.regenerate()
    
    def on_created(self, event):
        if event.is_directory:
            return
        if any(event.src_path.endswith(ext) for ext in ['.md', '.py', '.html', '.css', '.js']):
            print(f"File {event.src_path} has been created")
            self.regenerate()
    
    def regenerate(self):
        print("Regenerating content...")
        subprocess.run(["python", "parser/md.py"])
        subprocess.run(["python", "generate.py"])
        print("Content regenerated")

if __name__ == "__main__":
    event_handler = ChangeHandler()
    observer = Observer()
    # Watch both current directory and dist directory
    observer.schedule(event_handler, "templates", recursive=True)
    observer.start()
    
    http_server = subprocess.Popen(["python", "-m", "http.server", "8000", "--directory", "dist"])
    
    try:
        print("Watching for file changes... (Press Ctrl+C to stop)")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        http_server.terminate()
    observer.join()