import React, { useState , useEffect } from 'react';
import homeOne from './../../../shared/images/1.png'
import ExchangeOne from './../../../shared/images/2.png'
import Farming from './../../../shared/images/3.png'
import Stacking from './../../../shared/images/4.png'
import Market from './../../../shared/images/5.png'
import Pridict from './../../../shared/images/6.png'
import qa from './../../../shared/images/7.png'
import VideoPoster from './../../../shared/images/video-poster.png'
import Youtube from './../../../shared/images/YouTube-gray.png'
import AmountIcon from './../../../shared/images/amount-icon.png'
import d1 from './../../../shared/images/d-1.png'
import d12 from './../../../shared/images/d-2.png'
import medium from './../../../shared/images/medium-dark.png'
import telegram from './../../../shared/images/telegram-dark.png'
import twitter from './../../../shared/images/twitter-dark.png'
import drakLogo from './../../../shared/images/dark-logo.png'
import themeLight from './../../../shared/images/logo.png'
import lightLogoOne from './../../../shared/images/white.png'
import lightLOgoTwo from './../../../shared/images/dark.png'
import { useHistory, Link } from 'react-router-dom';
import { getDetailData } from './../../../services/services';
import ReactPlayer from "react-player"

interface Iprop {
    darkTheme: boolean,
    setDarkTheme: any
}
const LeftSideBar: React.FC<Iprop> = ({ darkTheme, setDarkTheme }: Iprop) => {
    let themeColor = sessionStorage.getItem('theme') || '';
    let selectedItem = sessionStorage.getItem('selected') || '';
    let Walletaddress = sessionStorage.getItem('Walletaddress') || '';
    const [address, setAddres] = useState(sessionStorage.getItem('Walletaddress') || '');
    const [data, setdata] = useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDetailData();
                console.log(response)
                setdata(response.data)
            } catch (error) { }
        }
        fetchData()
    }, [])

    return (
        <div className="col-2 px display_none">
            <div className="leftSide_Wrapper">
                <div className={"main_logo " + (themeColor === 'true' ? 'dark' : '')}>
                    <a href="/">
                        {themeColor === 'true' ?
                            <img src={drakLogo} alt="logo" /> :
                            <img src={themeLight} alt="logo" />}
                    </a>
                </div>
                <div className="menu_wrapper">
                    <ul>
                        <Link to ="/">
                            <li className={" " + (selectedItem === 'Home' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'Home')
                            }}>
                                <a href="/"><img src={homeOne} alt="menu" />Home</a>
                            </li>
                        </Link>
                        <li className={" " + (selectedItem === 'Exchange' ? 'active' : '')} onClick={() => {
                            sessionStorage.setItem('selected', 'Home')
                        }}>
                            <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x8dbc995946ad745dd77186d1ac10019b8ea6694a"><img src={ExchangeOne} alt="menu" />Exchange</a>
                        </li>
                        <Link to ="/farming">
                            <li className={" " + (selectedItem === 'Farming' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'Farming')
                            }}>
                                <a href="/farming"><img src={Farming} alt="menu" />Farming</a>
                            </li>
                        </Link>
                        <Link to ="/">
                            <li className={" " + (selectedItem === 'Staking' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'Staking')
                            }}>
                                <a href="/"><img src={Stacking} alt="menu" />Staking (soon)</a>
                            </li>
                        </Link>

                        <Link to="/psy-market">
                            <li className={" " + (selectedItem === 'Psychic' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'Psychic')
                            }}>
                                <a href="/psy-market"><img src={Market} alt="menu" />Psychic Market</a>
                            </li>
                        </Link>

                        <Link to="/predict-market">
                            <li className={" " + (selectedItem === 'Predict' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'Predict')
                            }}>
                                <a href="/predict-market"><img src={Pridict} alt="menu" />Predict Market</a>
                            </li>
                        </Link>
                        <Link to="/qa">
                            <li className={" " + (selectedItem === 'qa' ? 'active' : '')} onClick={() => {
                                sessionStorage.setItem('selected', 'qa')
                            }}>
                                <a href="/qa"><img src={qa} alt="menu" />Q&A</a>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="vedio_wrapper">
                    <div className={"vedio_posterImg " + (themeColor === 'true' ? 'dark' : '')}>
                        <img src={VideoPoster} alt="video poster" />
                    </div>
                    <div className="play_button">
                    <ReactPlayer width="300px" height="160px"
                      url="https://youtu.be/hmhkn2Piz3o"
                    />
                    </div>
                </div>
                <div className={"question_button " + (themeColor === 'true' ? 'dark' : '')}>
                    <a href="https://psychicfinance.medium.com/psychic-finance-a-crypto-farming-and-predictive-market-with-a-difference-8a108fdb009d" target="blank">What is PSY?</a>
                </div>
                <div className={"amount " + (themeColor === 'true' ? 'dark' : '')}>
                    <img src={AmountIcon} alt="amount icon" />
                    <span>{data?.market_data?.current_price.usd ? data?.market_data?.current_price.usd : '0,219'}</span>
                </div>
                <div className="component_wrapper">
                    <ul>
                        <li className="mood" onClick={() => {
                            setDarkTheme(!darkTheme)
                            sessionStorage.setItem('theme', JSON.stringify(darkTheme))
                        }}>
                            {!themeLight ?
                                <>
                                    <img src={d1} alt="white" />
                                    <img src={d12} alt="" /></>
                                :
                                <>
                                    <img src={lightLogoOne} alt="white" />
                                    <img src={lightLOgoTwo} alt="" /></>}
                        </li>
                        <li>
                            <a href="https://psychicfinance.medium.com/" target="blank"><img src={medium} alt="medium" /></a>
                        </li>
                        <li>
                            <a href="https://t.me/psychic_finance" target="blank"><img src={telegram} alt="telegram" /></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/FinancePsychic" target="blank"><img src={twitter} alt="twitter" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;