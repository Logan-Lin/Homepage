import markdown
import re
from typing import List


def markdown_to_html_paragraphs(markdown_text: str) -> List[str]:
    """
    Convert markdown text into a list of HTML paragraphs.
    Supports mathematical equations using LaTeX syntax.
    
    Args:
        markdown_text (str): The markdown text to convert
        
    Returns:
        List[str]: A list of HTML paragraphs, each wrapped in <p> tags
    """
    # Prepend "md/" to image paths if they don't already start with md/
    markdown_text = re.sub(r'!\[(.*?)\]\((?!md/)([^/].*?\.assets/.*?)\)', r'![\1](/blog/md/\2)', markdown_text)
    
    # Check if the first line starts with a # for h1 title
    lines = markdown_text.split('\n')
    has_h1_title = False
    bold_title = None
    
    if lines and lines[0].strip().startswith('#'):
        has_h1_title = True
        title_line = lines[0].strip().lstrip('#').strip()
        bold_title = f'<h1 class="blog-title">{title_line}</h1>'
        # Remove the title from the markdown to avoid duplicate processing
        markdown_text = '\n'.join(lines[1:])
    else:
        raise ValueError("No title found in the markdown file")
    
    # Configure markdown with math extensions
    extensions = [
        'markdown.extensions.extra',  # For blockquotes and other features
        'markdown.extensions.fenced_code',  # For code blocks
        'markdown.extensions.codehilite',  # For syntax highlighting
        'markdown.extensions.attr_list',  # For attributes
        'markdown.extensions.md_in_html',  # For markdown inside HTML
        'mdx_math',  # For math support
    ]
    
    try:
        # Try to use python-markdown-math which outputs compatible with MathJax 3
        import pymdownx.arithmatex
        extensions.remove('mdx_math')
        extensions.append('pymdownx.arithmatex')
        extension_configs = {
            'pymdownx.arithmatex': {
                'generic': True  # Uses \(...\) for inline and \[...\] for display math
            }
        }
    except ImportError:
        # Fallback to mdx_math
        extension_configs = {
            'mdx_math': {
                'enable_dollar_delimiter': True,  # Enable $...$ for inline math
            }
        }
    
    # Convert markdown to HTML with math support
    html = markdown.markdown(
        markdown_text,
        extensions=extensions,
        extension_configs=extension_configs
    )

    html = re.sub(r'<p>\s*(<img[^>]+>)\s*</p>', r'\1', html, flags=re.IGNORECASE)
    # Convert image followed by blockquote to figure with caption
    html = re.sub(
        r'<img([^>]+)>\s*<blockquote>\s*<p>(.*?)</p>\s*</blockquote>',
        r'<figure class="figure">\n  <img\1 class="figure-img img-fluid rounded">\n  <figcaption class="figure-caption">\2</figcaption>\n</figure>',
        html,
        flags=re.DOTALL
    )
    
    # Add "link" class and target="_blank" to all <a> tags
    html = re.sub(r'<a(.*?)>', r'<a\1 class="link" target="_blank">', html)
    html = re.sub(r'<a(.*?)class="(.*?)"(.*?)class="(.*?)"(.*?)>', r'<a\1class="\2 \4"\3\5>', html)
    html = re.sub(r'<a(.*?)target="(.*?)"(.*?)target="(.*?)"(.*?)>', r'<a\1target="\2"\3\5>', html)

    # Split the HTML into paragraphs
    paragraphs = html.split('\n\n')
    
    # Clean up and ensure each paragraph is properly wrapped
    cleaned_paragraphs = []
    
    # Add the bold title as the first element if it exists
    if has_h1_title and bold_title:
        cleaned_paragraphs.append(bold_title)
    
    for p in paragraphs:
        p = p.strip()
        if p:
            # If the paragraph doesn't already have <p> tags, add them
            if not (p.startswith('<') and not p.startswith('<p>')):
                p = f'<p>{p}</p>'
            cleaned_paragraphs.append(p)
    
    return cleaned_paragraphs, title_line


def insert_markdown_into_template(template_path: str, markdown_text: str) -> str:
    """
    Insert parsed markdown content into the template HTML file.
    
    Args:
        template_path (str): Path to the template HTML file
        markdown_text (str): The markdown text to convert and insert
        
    Returns:
        str: Complete HTML with markdown content inserted
    """
    # Parse markdown into HTML paragraphs
    html_paragraphs, title_line = markdown_to_html_paragraphs(markdown_text)
    
    # Read the template
    with open(template_path, 'r') as f:
        template = f.read()
    
    # Join paragraphs into a single string
    content_html = '\n'.join(html_paragraphs)
    
    # Insert the content into the template
    complete_html = template.replace('{{ content }}', content_html)
    
    # Replace {{ title }} placeholders with the extracted title
    complete_html = complete_html.replace('{{ title }}', title_line)
    
    return complete_html


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('-m', "--md_path", type=str, required=True)
    parser.add_argument('-o', "--html_path", type=str, required=True)
    args = parser.parse_args()

    with open(f"blog/md/{args.md_path}.md", "r") as f:
        markdown_text = f.read()
    html_paragraphs = markdown_to_html_paragraphs(markdown_text)
    
    # Test the new function
    complete_html = insert_markdown_into_template("blog/template.html", markdown_text)
    with open(f"blog/html/{args.md_path}.html", "w") as f:
        f.write(complete_html)
