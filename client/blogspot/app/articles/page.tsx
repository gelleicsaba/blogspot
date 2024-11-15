'use client'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import articleService from '@/services/article.service'
import { useState, useEffect } from 'react'
import CardHr from '@/components/cardHr'
import { Button } from '@nextui-org/button'
import SafeHtml from '@/components/SafeHtml'
import { ArticleCard } from '@/config/articleCard'
import { SearchIcon } from '@/components/icons'
import { Input } from "@nextui-org/input"

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

            if (search.length == 0) {
                const articleDto = await articleService.pageArticle(_page)
                setLastPage(articleDto.lastPage)
                const merge: any = [...articles, ...articleDto.data]
                setArticles(merge)
            } else {
                const articleDto = await articleService.searchArticle(search, _page)
                setLastPage(articleDto.lastPage)
                const merge: any = [...articles, ...articleDto.data]
                setArticles(merge)
            }
        }
        fetchData()
    }

    const handleKeyup = async (evt: Event) => {
        if (evt?.target) {
            const val = (evt.target as HTMLInputElement).value.trim()
            if (val!=="") {
                const articleDto = await articleService.searchArticle(val, 0)
                setPage(0)
                setSearch(val)
                setLastPage(articleDto.lastPage)
                setArticles(articleDto.data)
            } else {
                setPage(0)
                setSearch("")
                const articleDto = await articleService.pageArticle(0)
                setLastPage(articleDto.lastPage)
                setArticles(articleDto.data)
            }

        }

    }

    return (
        <div>
            <div className='pt-0 pl-0 pr-0 pb-10 flex md:flex md:flex-grow flex-row justify-end space-x-1'>
                <div className="w-80">
                    <Input
                        type="text"
                        label="Search"
                        defaultValue=""
                        className="max-w-xs w-80"
                        fullWidth={true}
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                handleKeyup(event);
                            }
                        }}
                        />
                </div>
            </div>
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
                        : <>Here is the end. There's no more articles.</>
                    }
                </span>
            </div>
        </div>
    )
}
export default Articles