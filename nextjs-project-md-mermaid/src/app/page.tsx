import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { CornerCom } from "@/components/CornerCom";
import { MermaidClient } from "@/components/MermaidClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function Home() {
  // 读取并解析 Markdown 文件
  async function getMarkdownContent() {
    try {
      // 使用相对路径获取 Markdown 文件
      const response = await fetch('/test.md', { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'text/markdown',
        }
      });
      
      if (!response.ok) {
        console.error('Failed to fetch markdown file:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        throw new Error(`Failed to fetch markdown file: ${response.status} ${response.statusText}`);
      }
      
      const fileContent = await response.text();
      
      // 使用 remark 处理 Markdown
      const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(fileContent);
        
      let contentHtml = processedContent.toString();
      contentHtml = contentHtml.replace(
        /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
          return `<div class="mermaid" data-mermaid="${encodeURIComponent(code)}"></div>`;
        }
      );
      
      return contentHtml;
    } catch (error) {
      console.error('Error loading markdown:', error);
      return '加载内容出错';
    }
  }

  // 获取处理后的 HTML 内容
  const content = await getMarkdownContent();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LanguageSwitcher />
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <MermaidClient />
      <CornerCom />
    </div>
  );
}
