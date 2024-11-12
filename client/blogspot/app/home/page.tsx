'use client'
import '@/styles/globals.css'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import articleService from '@/services/article.service'
import statService from '@/services/stat.service'
import { useState, useEffect } from 'react'
import CardHr from '@/components/cardHr'
import { ArrowsRotateIcon } from '@/components/icons'
import SafeHtml from '@/components/SafeHtml'
import { ArticleCard } from '@/config/articleCard'

const Home = () => {
    const [latest, setLatest] = useState({name: '',content: '', category: '', date: '' })
    const [random, setRandom] = useState({name: '',content: '', category: '', date: '' })
    const [stat, setStat] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let data = await articleService.getLatestArticle()
            setLatest(data)
            data = await articleService.getRandomArticle()
            setRandom(data)
            data = await statService.getStat()
            setStat(data)
        }

        fetchData();
    }, []);

    const refreshAnyArticle = async (evt: Event) => {
        let data = await articleService.getRandomArticle()
        while (data.name == random.name) {
            data = await articleService.getRandomArticle()
        }
        setRandom(data)
    }

    const contentTransform = (content?: string): string => {
        if (content) {
            let result = content.replaceAll("[link ", "<a target=\"_blank\" class=\"underline text-teal-500\" href=").replaceAll("\"]", "\">").replaceAll("[/link]", "</a>")
            return result
        }
        return ""
    }

    return (
        <div className="grid grid-cols-2 gap-20">
            <div>
                <Card className={ ArticleCard.card }>
                    <CardHeader>
                        <div className="flex items-center">
                            <span className="text-md font-bold">
                                Latest
                            </span>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CardHr top="5px" bottom="5px" />
                        <p className={ArticleCard.text.name}>
                            {latest.name}
                        </p>
                        <CardHr top="5px" bottom="5px" />
                        <p className={ArticleCard.text.content}>
                            {latest.content}
                        </p>
                        <CardHr top="5px" bottom="5px" />
                        <p className={ArticleCard.text.category}>
                            {latest.category}
                        </p>
                        <CardHr top="5px" bottom="5px" />
                        <p className={ArticleCard.text.date}>
                            {latest.date}
                        </p>
                    </CardBody>
                </Card>
            </div>

            <div>
                <Card className={ ArticleCard.card }>
                    <CardHeader>
                        <div className="grid grid-cols-2 w-full">
                            <div className="flex items-center">
                                <p className="text-md font-bold">
                                    Any
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <a href="#" onClick={refreshAnyArticle}>
                                    <ArrowsRotateIcon />
                                </a>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CardHr top="5px" bottom="5px" />
                            <p className={ArticleCard.text.name}>
                                {random.name}
                            </p>
                        <CardHr top="5px" bottom="5px" />
                            <p className={ArticleCard.text.content}>
                                <SafeHtml html={contentTransform(random.content)} />
                            </p>
                        <CardHr top="5px" bottom="5px" />
                            <p className={ArticleCard.text.category}>
                                {random.category}
                            </p>
                        <CardHr top="5px" bottom="5px" />
                            <p className={ArticleCard.text.date}>
                                {random.date}
                            </p>
                    </CardBody>
                </Card>
            </div>

            <div>
                <Card className={ ArticleCard.card }>
                    <CardHeader>
                        <span className="text-md font-bold">
                            Statistics
                        </span>
                    </CardHeader>
                    <CardBody>
                        <hr />
                        <div className="grid grid-cols-6">
                            {stat.map((st: any, index) => {
                                return (
                                    <>
                                        <div className="col-span-4 m-1 text-sm font-extralight">
                                            {st.category}
                                        </div>
                                        <div className="col-span-2 m-1 text-sm font-extralight">
                                            {st.id}
                                        </div>
                                    </>
                                )
                            })
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>
    )
}
export default Home