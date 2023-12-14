import { type FC, useState } from 'react'
import { type CommentType } from '../../../../api/types'
import classes from './CommentBody.module.css'
import { copy, unixToDate } from '../../../../utils/utils'

export interface CommentBodyProps {
  comments: CommentType[]
}
const CommentBody: FC<CommentBodyProps> = ({ comments }) => {
  const [openedComments, setOpenedComments] = useState({})

  return (
      <div className={classes.commentsBodyWrapper}>
          <div>Комментарии</div>
          <Comments comments={comments} openedComments={openedComments} onExpandComments={setOpenedComments}/>
      </div>
  )
}

export default CommentBody

interface CommentsProps {
  comments: CommentType[]
  openedComments: any
  onExpandComments: (comments: any) => void
}
function Comments ({ comments, openedComments, onExpandComments }: CommentsProps) {
  function expandComments (commentId: number) {
    const copyOpenedComments = copy(openedComments)

    if (copyOpenedComments[commentId]) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete copyOpenedComments[commentId]
    } else {
      copyOpenedComments[commentId] = {}
    }
    onExpandComments(copyOpenedComments)
  }
  function expandSubComments (commentId: number, subComments: CommentType) {
    const copyOpenedComments = copy(openedComments)

    copyOpenedComments[commentId] = subComments
    onExpandComments(copyOpenedComments)
  }

  return (
      <div className={classes.commentsWrapper}>
          {comments.map(commentItem => {
            return (
                <div key={commentItem.id } className={classes.commentContainer}>
                    <div className={classes.commentUsername}>{commentItem.by}</div>
                    <div className={classes.commentText}>{commentItem.text}</div>
                    <div className={classes.commentBottom}>
                        <div className={classes.commentTime}>{unixToDate(Number(commentItem.time))}</div>
                        {commentItem?.kids?.length &&
                            <button onClick={() => { expandComments(commentItem.id) }} className={classes.commentReplyButton}>
                                Ответить
                            </button>
                            }
                    </div>
                    {commentItem?.kids?.length && openedComments[commentItem.id] &&
                    <div className={classes.subComment}>
                        <Comments
                            comments={commentItem.kids}
                            openedComments={openedComments[commentItem.id]}
                            onExpandComments={(subComments) => { expandSubComments(commentItem.id, subComments) }}
                        />
                    </div>
                    }
                </div>
            )
          }
          )}
      </div>
  )
}