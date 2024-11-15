'use client'
import { useState, useEffect, useRef } from 'react'
import articleService from '@/services/article.service'
import SafeHtml from '@/components/SafeHtml'

const Header = () =>  {
    const [posX, setPosX] = useState(1550)
    const [text, setText] = useState("")
    // const [width, setWidth] = useState(9999)
    const ref = useRef(null)

    useEffect(() => {

        const fetchData = async () => {
            const data = await articleService.limitDesc(10)
            let sb = ""
            for (const dt of data) {
                if (dt != data[data.length-1]) {
                    sb += `${dt.name} <span class='text-xs italic'>(${dt.category} - ${dt.date})</span> ** `
                } else {
                    sb += `${dt.name} <span class='text-xs italic'>(${dt.category} - ${dt.date})</span>`
                }
            }
            setText(sb)
        }

        fetchData().then(()=>{


        })

    }, [])

    useEffect(() => {
        let width = ref.current ? ref.current.offsetWidth : 0
        let posx = posX

        const interval = setInterval(()=> {
            setPosX((p) => p - 1)
            posx-=1;
            if (posx < -width) {
                console.log("QQ End of turn")
                setPosX(1550)
                posx = 1550
            }
        },30)
        return () => clearInterval(interval)


    }, [text, ref.current])



    const height = "26px"

    return (
        <>
            <div>
                <div className="flex" style={{ height: height}}>
                    <div className="grow opacity-100 bg-white z-10">

                    </div>
                    <div className="flex-none opacity-0" style={{width: "1150px"}}>

                    </div>
                    <div className="grow opacity-100 bg-white z-10">

                    </div>
                </div>
            </div>

            <div className="w-full">
                <div style={{
                        position: "absolute",
                        left: posX.toString()+"px",
                        top: "2px",
                        textAlign: "left",
                        zIndex: "0",
                        height: height,
                        display: "inline-block",
                        width: "fit-content",
                        blockSize: "fit-content",
                        overflow: "hidden",
                        whiteSpace: "nowrap"

                    }}
                    className="font-extralight font-sans antialiased tracking-tight text-sm"
                    ref={ref}
                >
                    <SafeHtml html={text}/>
                </div>

            </div>
        </>
    )
}
export default Header