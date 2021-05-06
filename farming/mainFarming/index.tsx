import React, { useState } from 'react';
import headImage from './../../../shared/images/fr-head-img-dark.png'
import Fr1 from './../../../shared/images/fr-1.png'
import Fr2 from './../../../shared/images/fr-2.png'
import Fr3 from './../../../shared/images/fr-3.png'
import Fr4 from './../../../shared/images/fr-4.png'
import Fr5 from './../../../shared/images/fr-5.png'
import Fr6 from './../../../shared/images/fr-6.png'
import { useHistory, Link } from 'react-router-dom';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
import MASTERABI from './../../../constants/abi/MasterChef.json'
import LPABI from './../../../constants/abi/LP.json'
import  {psybnb,psybusd,psycake,masterChefAddress} from './../../../constants/tokenAddresses'
import { getDetailData, getCoinCapData } from './../../../services/services';
interface Iprop {
    darkTheme: boolean,
}
const FarmingMain: React.FC<Iprop> = ({ darkTheme }: Iprop) => {
    let themeColor = sessionStorage.getItem('theme') || '';
    let Walletaddress = sessionStorage.getItem('Walletaddress') || '';
    let Psybal = sessionStorage.getItem('Psybal') || '';
    let PsyTVL = sessionStorage.getItem('PsyTVL') || '';
    let PsyLocked = sessionStorage.getItem('PsyLocked') || '';

    let tvl_1_amount_1 = sessionStorage.getItem('tvl_1_amount_1') || '';
    let tvl_1_amount_2 = sessionStorage.getItem('tvl_1_amount_2') || '';

    let tvl_2_amount_1 = sessionStorage.getItem('tvl_2_amount_1') || '';
    let tvl_2_amount_2 = sessionStorage.getItem('tvl_2_amount_2') || '';

    let tvl_3_amount_1 = sessionStorage.getItem('tvl_3_amount_1') || '';
    let tvl_3_amount_2 = sessionStorage.getItem('tvl_3_amount_2') || '';

    let reward_1 = sessionStorage.getItem('reward_1') || '';
    let reward_2 = sessionStorage.getItem('reward_2') || '';
    let reward_3 = sessionStorage.getItem('reward_3') || '';

    let apy_1 = sessionStorage.getItem('apy_1') || '';
    let apy_2 = sessionStorage.getItem('apy_2') || '';
    let apy_3 = sessionStorage.getItem('apy_3') || '';

    const web3 = new Web3(Web3.givenProvider);

    const [address, setAddres] = useState(sessionStorage.getItem('Walletaddress') || '');
    const [data, setdata] = useState<any>([])


    function numberWithCommas(x :any) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }




    const histroy = useHistory()




    return (
        <div className="col-12 col-sm-12">
            <div className={"middleSide_Wrapper br " + (themeColor === 'true' ? 'dark' : '')}>
                <div className="middleContent_head">
                    <div className="row">
                        <div className="col-12 col-sm-3 text-right">
                            <img src={headImage} alt="" />
                        </div>
                        <div className="col-12 col-sm-6 text-center">
                            <div className="market_heading">
                                <h3>Stake LP tokens to earn PSY</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-3 text-right">
                            <img className="mobileDis_none" src={headImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="middleContent_main">
                    <div className="row mt-40">
                        <div className="col-12 col-lg-4">
                            <div className={"single_activity single_farming " + (themeColor === 'true' ? 'dark' : '')}>
                                <div className="headign">
                                    <div className="head_image text-center">
                                        <img src={Fr1} alt="" />
                                        <img src={Fr2} alt="" />
                                    </div>
                                    <div className="headText text-center">
                                        <span>PSY - BNB</span>
                                    </div>
                                </div>
                                <div className="approve_btn text-center">
                                    <Link to="/farming/BNB"><a href="/farming/BNB">Approve contract</a></Link>
                                </div>
                                <div className="pricing">
                                    <div className="price_text farming_priceText">
                                        <span>Total BNB Locked</span>
                                        <span>Total PSY Locked</span>
                                        <span>Reward</span>
                                        <span>APY</span>
                                    </div>
                                    <div className="price farming_price">
                                        <span>{numberWithCommas(tvl_1_amount_2)} BNB</span>
                                        <span>{numberWithCommas(tvl_1_amount_1)} PSY</span>
                                        <span>{reward_1} PSY / Block</span>
                                        <span className="pink_color">{apy_1}%</span>
                                    </div>
                                    <div className="clr"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className={"single_activity single_farming " + (themeColor === 'true' ? 'dark' : '')}>
                                <div className="headign">
                                    <div className="head_image text-center">
                                        <img src={Fr3} alt="" />
                                        <img src={Fr4} alt="" />
                                    </div>
                                    <div className="headText text-center">
                                        <span>PSY - BUSD</span>
                                    </div>
                                </div>
                                <div className="approve_btn text-center">
                                    <Link to="/farming/BUSD"><a href="/farming/BUSD">Approve contract</a></Link>
                                </div>
                                <div className="pricing">
                                    <div className="price_text farming_priceText">
                                        <span>Total BUSD Locked</span>
                                        <span>Total PSY Locked</span>
                                        <span>Reward</span>
                                        <span>APY</span>
                                    </div>
                                    <div className="price farming_price">
                                        <span>{numberWithCommas(tvl_2_amount_2)} BUSD</span>
                                        <span>{numberWithCommas(tvl_2_amount_1)} PSY</span>
                                        <span>{reward_2} / Block</span>
                                        <span className="pink_color">{apy_2}%</span>
                                    </div>
                                    <div className="clr"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className={"single_activity single_farming " + (themeColor === 'true' ? 'dark' : '')}>
                                <div className="headign">
                                    <div className="head_image text-center">
                                        <img src={Fr5} alt="" />
                                        <img src={Fr6} alt="" />
                                    </div>
                                    <div className="headText text-center">
                                        <span>PSY - CAKE</span>
                                    </div>
                                </div>
                                <div className="approve_btn text-center">
                                    <Link to="/farming/CAKE"><a href="/farming/CAKE">Approve contract</a></Link>
                                </div>
                                <div className="pricing">
                                    <div className="price_text farming_priceText">
                                        <span>Total Cake Locked</span>
                                        <span>Total PSY Locked</span>
                                        <span>Reward</span>
                                        <span>APY</span>
                                    </div>
                                    <div className="price farming_price">
                                        <span>{numberWithCommas(tvl_3_amount_1)} Cake</span>
                                        <span>{numberWithCommas(tvl_3_amount_2)} PSY</span>
                                        <span>{reward_3} PSY / Block</span>
                                        <span className="pink_color">{apy_3}%</span>
                                    </div>
                                    <div className="clr"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FarmingMain;