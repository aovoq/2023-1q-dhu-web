'use client'
import styled from 'styled-components'

const Section = styled.section`
   background: var(--background);
   padding-block-end: calc(8px * 40);
`

const Article = styled.article`
   width: calc(100% - 170px * 2);
   margin-inline: auto;
   margin-block-start: calc(8px * 30);
   display: flex;
   @media (max-width: 768px) {
      width: calc(100% - 20px * 2);
      flex-direction: column;
      gap: calc(8px * 5);
   }
`

const ArticleHead = styled.div`
   width: 50%;
   flex-shrink: 0;
   font-size: 24px;
   letter-spacing: 0.05em;
   font-weight: 400;
   font-family: var(--font-ttcommons);
`

const ArticleTitle = styled.h3`
   font-size: 30px;
   font-weight: 700;
   letter-spacing: 0.12em;
   margin-block-end: 24px;
`

const ArticleContent = styled.p`
   font-size: 16px;
   line-height: 2;
   letter-spacing: 0.08em;
`

const ArticleContentList = styled.ul`
   list-style: none;
   display: flex;
   flex-direction: column;
   gap: calc(8px * 6);
`

const ArticleContentListItem = styled.li`
   border-block-end: 1px solid #787878;
   padding-block-end: 24px;
`

const ArticleContentListItemHead = styled.div`
   display: flex;
   align-items: flex-end;
`

const ArticleContentListItemNum = styled.span`
   width: calc(8px * 9);
   font-size: 20px;
   letter-spacing: 0.05em;
`

const ArticleContentListItemTitle = styled.h4`
   font-size: 20px;
   letter-spacing: 0.15em;
`

const ArticleContentListItemContent = styled.p`
   font-size: 14px;
   margin-block-start: 16px;
   margin-inline-start: calc(8px * 9);
   letter-spacing: 0.1em;
   line-height: 1.3;
`

const InfoSection = () => {
   const WORKFLOW = [
      {
         title: '企画',
         content: '課題の発見から、意外性の創出。ニーズやトレンドにあわせたものを考えられるように'
      },
      {
         title: '設計',
         content: 'ターゲットのことを考え、何を求められているのか、どういったアプローチが刺さるのかを考えられるように'
      },
      {
         title: 'デザイン',
         content: '触れていたくなるウェブサイトを。インタラクションのプランニングや映像・写真のディレクションなどより良いモノを提供できるように'
      },
      {
         title: '実装',
         content: '複雑のものから、細部にまで気を配れる実装を'
      },

   ]
   return (
      <Section>
         <Article>
            <ArticleHead>
               <h2>VISION</h2>
            </ArticleHead>
            <div>
               <ArticleTitle>
                  この情報社会に、
                  <br />
                  情報を伝えられる人に
               </ArticleTitle>
               <ArticleContent>
                  私達は伝えたいことが伝えたいように伝わらないものは
                  <br />
                  デザインではないと考えています。
                  <br />
                  この情報社会においてあなただから伝えられるものを、あなたならではの表現方法を模索していきましょう。
                  <br />
                  そのための学習がデジタルハリウッド大学には用意されています。
               </ArticleContent>
            </div>
         </Article>
         <Article>
            <ArticleHead>
               <h2>LEARN</h2>
            </ArticleHead>
            <div>
               <ArticleTitle>
                  Web制作を
                  <br />
                  網羅的に基礎から最先端まで
               </ArticleTitle>
               <ArticleContent>
                  デザイン系、コード（プログラミング）系の2系統の授業があり、
                  <br />
                  双方を複合的に学んだり、片方に特化して学ぶことも可能。
                  <br />
                  Webサイト制作プロジェクト演習ではひとつのテーマについてグループを組み、得意な技術を活かすことができます。
               </ArticleContent>
            </div>
         </Article>
         <Article>
            <ArticleHead>
               <h2>WORKFLOW</h2>
            </ArticleHead>
            <div>
               <ArticleContentList>
                  {WORKFLOW.map((item, index) => (
                     <ArticleContentListItem key={item.title}>
                        <ArticleContentListItemHead>
                           <ArticleContentListItemNum>0{index+1}</ArticleContentListItemNum>
                           <ArticleContentListItemTitle>{item.title}</ArticleContentListItemTitle>
                        </ArticleContentListItemHead>
                        <ArticleContentListItemContent>{item.content}</ArticleContentListItemContent>
                     </ArticleContentListItem>
                  ))}
               </ArticleContentList>
            </div>
         </Article>
      </Section>
   )
}

export default InfoSection
