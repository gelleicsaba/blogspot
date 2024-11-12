'use client'
import { useEffect, useState, useRef } from 'react'
import SafeHtml from '@/components/SafeHtml'

const About = () => {
    const myname = "gellei.csaba"

    const [codes, setCodes] = useState([])
    const [done, setDone] = useState(false)
    const [text, setText] = useState("")
    const inputElement: any = useRef()
    const typeText =
`Hello!

My name is gellei.csaba.
I am a developer, and I'm intrested in Javascript/Typescript and backend technologies
like Angular, Java Spring boot, NodeJs microservice, React, Vue, Python
or ASP.Net/C#.

This site is my ideas & tips blog site. Day by day I write minimalist articles.
I hope it will help you or it will give a tip for you. Learn languages, technologies and
methods & collect the stacks.

name: gellei.csaba
e-mail: gellei.csaba@gmail.com
serial number: 87f64436-d938085c-aefe0261-bfa9f951

(your serial number: md5 (your name.birthdate.birthplace,
  and thats all with lowercase) )

Home projects:
I've created some home project like Raggae a regex text builder with xml
inputs that has been written in Python, NCLI is a Node Js Router & Tester CLI
that has also written in python, and this blog site that has been created
with Spring boot/React/NextUI/PostgreSQL. I've also created another site "ItWouldBeNice"
which is created with Angular/Material NodeJS microservice/MongoDB.
(I haven't published it yet)

Favorites:
-Music: tribal dnb/jungle,amen,raggacore
-Sports: Soccer/NFL
-AI: Claude AI
-IDE: IntelliJ Idea, VS Code
-OS: Linux Mint
`.replaceAll("\n","<br>")


    useEffect(() => {
        getPattern()
        setDone(true)
        typeWriterEffect()
    }, [])


    const getPattern = () => {
        const pattern: any = []
        for (let x = 0; x < myname.length; ++x) {
            console.log(myname.charCodeAt(x).toString(2))
            pattern.push(myname.charCodeAt(x).toString(2))
        }
        setCodes(pattern)
    }

    const draw = (bits: string, idx: number) => {
        return ( (bits.charAt(idx) == '1') ?
                <div className="bg-black border border-black rounded-full"></div>
                :
                <div className="bg-white border border-black rounded-full"></div>
        )
    }

    const typeWriterEffect = () => {
        let pos = 0;
        const interval = setInterval(() => {
            if (typeText.charAt(pos) == '<') {
                pos += 3
            }
            setText(`${typeText.substring(0,pos)}&#x258C;`)

            if (inputElement != null) {
                inputElement.current.scrollTop = inputElement.current.scrollHeight
            }

            ++pos
            if (pos > typeText.length) {
                clearInterval(interval)
            }
        },40)
        return interval
    }

    const content = () => {
        return (
            <>
            <div style={{ position: "absolute" }}>
            <div style={{ position: "relative", left: "300px", minHeight: "500px", maxHeight: "500px" }} className="overflow-y-scroll" ref={inputElement}>
                    <div className="font-light text-sm" style={{width: "600px", minHeight: "500px", maxHeight: "500px" }}>
                        <SafeHtml html={ text } />
                    </div>
                </div>
            </div>

            <div style={{ position: "absolute" }}>
            <div style={{ position: "relative", left: "120px" }}>
                <div className="border-5 rounded-lg px-2 py-2 border-lime-100 w-fit">

                    {codes.map((bits: string, index) => (
                            <div className="grid grid-cols-8 gap-1 h-3 mt-1">
                                {[...Array(8)].map((x, i) => (
                                        draw(bits, i)
                                    )
                                )}
                            </div>
                    ))}
                    <p className="font-light text-xl font-sans ">
                        gellei.csaba
                    </p>
                </div>
                </div></div>
            </>
        )
    }


    return (
        <>
            { done ? content() : ""}
        </>
    )
}
export default About