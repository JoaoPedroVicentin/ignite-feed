import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps{
    author: {
        name: string;
        role: string;
        avatarUrl: string;
    }
    publishedAt: Date;
    content: Content[]
}

export function Post({author, publishedAt, content}: PostProps) {
    
    const [comments, setComments] = useState([
        'Post bem bacana!',
    ])
    const [newCommentText, setNewCommentText] = useState('')
    
    const publishedDateFormatted = new Intl.DateTimeFormat('pt-Br',{
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    }).format(publishedAt);

    const isNewCommentEmpty = newCommentText.length === 0;

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('');

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório');
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete})
        setComments(commentsWithoutDeletedOne)
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author} >
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title="" dateTime="">
                    {publishedDateFormatted}
                </time> 
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name="comment" 
                    placeholder="Deixe o seu comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}