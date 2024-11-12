'use client'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import articleService from '@/services/article.service'
import { useState, useEffect } from 'react'
import CardHr from '@/components/cardHr'
import { Button } from '@nextui-org/button'
import SafeHtml from '@/components/SafeHtml'
import { ArticleCard } from '@/config/articleCard'

const Articles = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const _search = localStorage?.getItem("search")
            if (_search) {
                setSearch(_search)
            } else {
                setSearch("")
            }

            setPage(0)

            const articleDto = await articleService.pageArticle(page)
            setLastPage(articleDto.lastPage)
            setArticles(articleDto.data)
        }
        fetchData()
    }, [])

    const contentTransform = (content?: string): string => {
        if (content) {
            let result = content.replaceAll("[link ", "<a target=\"_blank\" class=\"underline text-teal-500\" href=").replaceAll("\"]", "\">").replaceAll("[/link]", "</a>")
            return result
        }
        return ""
    }


    const articleBox = (article?: any) => {
        if (article) {
            return (
                <div>
                    <Card className={ ArticleCard.card }>
                        <CardHeader>
                            <div className="flex items-center">
                                <span className={ ArticleCard.text.name }>
                                    {article.name}
                                </span>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <CardHr top="5px" bottom="5px" />
                                <span className={ ArticleCard.text.content }>
                                    <SafeHtml html={contentTransform(article.content)} />
                                </span>
                            <CardHr top="5px" bottom="5px" />
                                <span className={ArticleCard.text.category}>
                                    {article.category}
                                </span>
                            <CardHr top="5px" bottom="5px" />
                            <span className={ArticleCard.text.date}>
                                {article.date}
                            </span>
                        </CardBody>
                    </Card>
                </div>
            )
        } else {
            return (<div>&nbsp;</div>)
        }
    }

    const addMore = () => {
        const _page = page + 1
        setPage(_page)
        console.log(_page)
        const fetchData = async () => {
            const articleDto = await articleService.pageArticle(_page)
            setLastPage(articleDto.lastPage)
            const merge: any = [...articles, ...articleDto.data]
            setArticles(merge)
        }
        fetchData()
    }


    return (
        <div>
            <div className="grid grid-cols-2 gap-20">
                {articles.map((article: any) => (
                    articleBox(article)
                ))}
            </div>
            <div className="grid grid-cols-1 gap-20 m-20">
                <span className="text-center">
                    { (page < lastPage) ?
                            <Button size="md" onPress={addMore}>
                                Read more
                            </Button>
                        : <>--- Here is the end. There's no more articles. ---</>
                    }
                </span>
            </div>
        </div>
    )
}
export default Articles