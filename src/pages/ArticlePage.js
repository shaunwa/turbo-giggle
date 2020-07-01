import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import { CommentsList } from '../components/CommentsList';
import { UpvotesSection } from '../components/UpvotesSection';

export const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { name } = useParams();

    useEffect(() => {
        const fetchArticleInfo = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }

        fetchArticleInfo();
    }, [name]);

    const matchingArticle = articles.find(article => article.name === name);

    return matchingArticle
        ? (<>
            <h1>{matchingArticle.title}</h1>
            <UpvotesSection upvotes={articleInfo.upvotes} articleName={name} setArticleInfo={setArticleInfo} />
            {matchingArticle.content.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
            ))}
            <CommentsList
                comments={articleInfo.comments}
                articleName={name}
                setArticleInfo={setArticleInfo} />
        </>)
        : <h1>Uh oh, article doesn't exist</h1>;
}