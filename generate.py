import os
import yaml
from jinja2 import Environment, FileSystemLoader


if __name__ == '__main__':
    with open('data.yaml', 'r') as file:
        profile_data = yaml.safe_load(file)

    env = Environment(loader=FileSystemLoader('templates'))

    os.makedirs('dist', exist_ok=True)
    os.makedirs('dist/publications', exist_ok=True)
    os.makedirs('dist/projects', exist_ok=True)
    os.makedirs('dist/presentations', exist_ok=True)

    def render_template(template_name, output_path, **kwargs):
        template = env.get_template(template_name)
        html = template.render(**kwargs)

        with open(output_path, 'w') as file:
            file.write(html)

        print(f'Generated {output_path}')

    render_template('index.html', 'dist/index.html', data=profile_data, is_home_page=True)
    render_template('publications.html', 'dist/publications/index.html', data=profile_data, is_home_page=False)
    render_template('projects.html', 'dist/projects/index.html', data=profile_data, is_home_page=False)
    render_template('presentations.html', 'dist/presentations/index.html', data=profile_data, is_home_page=False)
    print('Static site generation complete!')
