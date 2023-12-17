import { type FC, useEffect, useState } from 'react'
import { type CommentType } from '../../../../api/types'
import parse from 'html-react-parser'
import classes from './CommentBody.module.css'
import { unixToDate } from '../../../../utils/utils'
import { get } from '../../../../api/api'

export interface CommentBodyProps {
  comments: CommentType[]
}
const CommentBody: FC<CommentBodyProps> = ({ comments }) => {
  const [openedComments, setOpenedComments] = useState<boolean>(false)
  const [subComments, setSubComments] = useState<CommentType[]>([])
  const [currentComment, setCurrentComment] = useState<number | null>(null)

  async function getSubComments (commentIds: number[]) {
    const promises: Array<Promise<any>> = commentIds.map(async commentId => {
      return await get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
    })
    const response = await Promise.all(promises)
    setSubComments(response.filter(Boolean))
  }

  const onExpandComments = (id: number[], currentId: number) => {
    void getSubComments(id)
    setCurrentComment(currentId)

    setOpenedComments(prevState => !prevState)
    console.log('subComments------->', subComments)
    console.log('id------->', id)
    console.log('currentComment------->', currentComment)
  }
  useEffect(() => {
    console.log('subComments (effect)------->', subComments)
  }, [subComments])
  return (
      <div className={classes.commentsBodyWrapper}>
          <div>Комментарии:</div>
          <div className={classes.commentsWrapper}>
              {comments.map(commentItem => {
                return (
                    <div key={commentItem.id} className={classes.commentContainer}>
                        <div className={classes.commentUsername}>{commentItem.by}</div>
                        <div className={classes.commentText}>{parse(String(commentItem.text))}</div>
                        <div className={classes.commentBotton}>
                            <div className={classes.commentTime}>{unixToDate(Number(commentItem.time))}</div>
                            {commentItem.kids?.length &&
                            <button onClick={() => {
                              onExpandComments(commentItem.kids as [], commentItem.id)
                            }} className={classes.commentReplyButton}>
                                Ответить
                            </button>
                        }
                            <div className={classes.commentTime}>
                                {openedComments && commentItem.kids?.length &&
                                    <SubComments openedComments={openedComments} subComments={subComments} />
                            }
                            </div>
                        </div>
                    </div>
                )
              }
              )}
          </div>
      </div>
  )
}

export default CommentBody

interface CommentsProps {
  openedComments: boolean
  subComments: CommentType[]
}

const SubComments: FC<CommentsProps> = (props) => {
  const { openedComments, subComments } = props
  return (
      <>
          {openedComments &&
              <div className={classes.subCommentsWrapper}>
                  {subComments.map(subCommentsItem => {
                    return (
                        <div key={subCommentsItem.id} className={classes.commentContainer}>
                            <div className={classes.commentUsername}>{subCommentsItem.by}</div>
                            <div className={classes.commentText}>{parse(String(subCommentsItem.text))}</div>
                            <div className={classes.commentBottom}>
                                <div className={classes.commentTime}>{unixToDate(Number(subCommentsItem.time))}</div>
                            </div>
                        </div>
                    )
                  }
                  )}
              </div>
        }
      </>
  )
}