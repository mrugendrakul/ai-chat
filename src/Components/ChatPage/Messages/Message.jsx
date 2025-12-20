import React from 'react'
import Markdown from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter, { Light } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { vsDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import remarkGfm from 'remark-gfm'

const Message = ({
  role, content
}) => {
  return (
    <div className={role === "user" ? 'user-message-block' : 'ai-message-block'}>
      <div className={role === "user" ? 'user-message-block-content' : 'ai-message-block-content'}>
        <Markdown
          
          unwrapDisallowed={true}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ?
              (
              <div style={{textWrap:'wrap'}}>
                <SyntaxHighlighter 
                style={docco}
                customStyle={{background:'none'}}
                
                language={match[1]}
              {...rest}  >
                  {children}
                </SyntaxHighlighter> </div>
                )
                :
              (
                <code {...rest} className={className} style={{textWrap:'wrap'}}>
                  {children}
                </code>
              )
            },
            p(props){
              const {children,className,node,...rest} = props
              return (
                <p style={{textAlign:'left'}}>
                  {children}
                </p>
              )
            }
          }
          }

          remarkPlugins={[remarkGfm]}
        >
          {content}
        </Markdown>
      </div>
    </div>
  )
}

export default Message