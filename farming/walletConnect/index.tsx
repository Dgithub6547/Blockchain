import React, { useState } from 'react';
import medium from './../../../shared/images/medium-dark.png'
import telegram from './../../../shared/images/telegram-dark.png'
import twitter from './../../../shared/images/twitter-dark.png'
import drakLogo from './../../../shared/images/dark-logo.png'
import walletOne from './../../../shared/images/wallet-1.png'
import walletTwo from './../../../shared/images/wallet-2.png'
import walletThree from './../../../shared/images/wallet-3.png'
import logoutDrak from './../../../shared/images/logout-dark.png'
import themeLight from './../../../shared/images/logo.png'
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';
import { InjectedConnector } from "@web3-react/injected-connector";
import { walletconnect } from './../../../utilts/index';
import { useActiveWeb3React } from './../../../utilts/checkActivate';

import { AbiItem } from 'web3-utils'
import ERC20ABI from './../../../constants/abi/ERC20.json'
import MASTERABI from './../../../constants/abi/MasterChef.json'
import LPABI from './../../../constants/abi/LP.json'
import  {psybnb,psybusd,psycake,psytoken,masterChefAddress} from './../../../constants/tokenAddresses'
import { getDetailData, getCoinCapData } from './../../../services/services';

interface Iprop {
    darkTheme: boolean,
}
const WalletConnectSide: React.FC<Iprop> = ({ darkTheme }: Iprop) => {
    const { chainId, account, connector } = useActiveWeb3React()
    const NUMBER_BLOCKS_PER_YEAR = 10512000

    let themeColor = sessionStorage.getItem('theme') || '';
    let Walletaddress = sessionStorage.getItem('Walletaddress') || '';
    let Psybal = sessionStorage.getItem('Psybal') || '';
    
    const [address, setAddress] = useState('');
    // const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

    const web3 = new Web3(Web3.givenProvider);
    const context = useWeb3React();
    const { activate, active, error, deactivate, library } = context;
    const Injected = new InjectedConnector({ supportedChainIds: [56] });
    const [activatingConnector, setActivatingConnector] = React.useState<any>();
    const [data, setdata] = useState<any>([])

    const handleMetaMaskLogin = async () => {
        if (activatingConnector === null || activatingConnector === undefined) {
            activate(Injected);
            sessionStorage.setItem('type', 'metamask')
        } else {
            if (account) {
                sessionStorage.setItem('Walletaddress', account)
                sessionStorage.setItem('type', 'metamask')
                setAddress(account)
            }
        }
        await setActivatingConnector(Injected);
    };

    const handleWalletConnectLogin = async () => {
        if (activatingConnector === null || activatingConnector === undefined) {
            activate(walletconnect)
            sessionStorage.setItem('type', 'walletconnect')

        } else {
            if (account) {
                sessionStorage.setItem('Walletaddress', account)
                sessionStorage.setItem('type', 'walletconnect')
                setAddress(account)
            }
        }
        await setActivatingConnector(Injected);
    };


    //save account in session storage when we get account
    React.useEffect(() => {
        if (account) {
            web3.eth.getBalance(account, function (err: any, balance: any) {
                if (err === null) {
                    console.log('balance', web3.utils.fromWei(balance, "ether"))
                    //   $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
                }
            });
            sessionStorage.setItem('Walletaddress', account)
            setAddress(account)
            window.location.reload()
        }
    }, [account]);

    
    React.useEffect(() => {
        console.log('context ', context)
    }, [context]);

    React.useEffect(() => {

        let loader = async () => { 
            if(Walletaddress != '') {
                let token_contract = new web3.eth.Contract((ERC20ABI.abi as unknown) as AbiItem, psytoken);
        
                // lets load all the stuff
                let psy_bal = await token_contract.methods.balanceOf(Walletaddress).call();    
                sessionStorage.setItem('Psybal', (psy_bal/1e18).toFixed(2))    
                
                let master_contract = new web3.eth.Contract((MASTERABI.abi as unknown) as AbiItem, masterChefAddress);

                // lets load all the stuff
                let PsyTVL_ = await master_contract.methods.totalLock().call();    
                // var currentUSD = data?.market_data?.current_price.usd;
                // console.log(currentUSD)
                // console.log("TVL :", ((PsyTVL_/1e18) * data?.market_data?.current_price.usd).toFixed(2))
                sessionStorage.setItem('PsyLocked', ((PsyTVL_)/1e18).toFixed(0) )

                // lets load all the stuff
                let lp_contract_bnb = new web3.eth.Contract((LPABI.abi as unknown) as AbiItem, psybnb);
                let lp_contract_busd = new web3.eth.Contract((LPABI.abi as unknown) as AbiItem, psybusd);
                let lp_contract_cake = new web3.eth.Contract((LPABI.abi as unknown) as AbiItem, psycake);

                //load the TVL of each
                //get the amount locked in the LP pool
                let supply_1 = await lp_contract_bnb.methods.balanceOf(masterChefAddress).call()
                let supply_2 = await lp_contract_busd.methods.balanceOf(masterChefAddress).call()
                let supply_3 = await lp_contract_cake.methods.balanceOf(masterChefAddress).call()
                sessionStorage.setItem('supply_1', (supply_1/1e18).toFixed(2))
                sessionStorage.setItem('supply_2', (supply_2/1e18).toFixed(2))
                sessionStorage.setItem('supply_3', (supply_3/1e18).toFixed(2))

                let thing =  await lp_contract_bnb.methods.getReserves().call();
                sessionStorage.setItem('tvl_1_amount_1', (thing[0]/1e18).toFixed(2))
                sessionStorage.setItem('tvl_1_amount_2', (thing[1]/1e18).toFixed(2))

                //calculate lp token constituents
                let adjusted_tvl_1_amount_1 = (supply_1 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing[0]/1e18)
                let adjusted_tvl_1_amount_2 =  (supply_1 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing[1]/1e18)
                sessionStorage.setItem('adjusted_tvl_1_amount_1', adjusted_tvl_1_amount_1.toFixed(3))
                sessionStorage.setItem('adjusted_tvl_1_amount_2', adjusted_tvl_1_amount_2.toFixed(3))                


                let thing1 =  await lp_contract_busd.methods.getReserves().call();
                sessionStorage.setItem('tvl_2_amount_1', (thing1[0]/1e18).toFixed(2))
                sessionStorage.setItem('tvl_2_amount_2', (thing1[1]/1e18).toFixed(2))


                let adjusted_tvl_2_amount_1 = (supply_3 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing1[0]/1e18)
                let adjusted_tvl_2_amount_2 =  (supply_3 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing1[1]/1e18)
                sessionStorage.setItem('adjusted_tvl_2_amount_1', adjusted_tvl_2_amount_1.toFixed(3))
                sessionStorage.setItem('adjusted_tvl_2_amount_2', adjusted_tvl_2_amount_2.toFixed(3))                


                let thing2 =  await lp_contract_cake.methods.getReserves().call();
                sessionStorage.setItem('tvl_3_amount_1', (thing2[0]/1e18).toFixed(2))
                sessionStorage.setItem('tvl_3_amount_2', (thing2[1]/1e18).toFixed(2))

                let adjusted_tvl_3_amount_1 = (supply_3 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing2[0]/1e18)
                let adjusted_tvl_3_amount_2 =  (supply_3 / (await lp_contract_bnb.methods.totalSupply().call())) * (thing2[1]/1e18)
                sessionStorage.setItem('adjusted_tvl_3_amount_1', adjusted_tvl_3_amount_1.toFixed(3))
                sessionStorage.setItem('adjusted_tvl_3_amount_2', adjusted_tvl_3_amount_2.toFixed(3))                
                

                //load reward of each
                let reward_1 = await master_contract.methods.getNewRewardPerBlock(1).call()
                let reward_2 = await master_contract.methods.getNewRewardPerBlock(2).call()
                let reward_3 = await master_contract.methods.getNewRewardPerBlock(3).call()
                sessionStorage.setItem('reward_1', (reward_1/1e18).toFixed(2))
                sessionStorage.setItem('reward_2', (reward_2/1e18).toFixed(2))
                sessionStorage.setItem('reward_3', (reward_3/1e18).toFixed(2))
                
                //load apy of each
                let apy_1 = (1 +((reward_1/1e18)/NUMBER_BLOCKS_PER_YEAR )) ** NUMBER_BLOCKS_PER_YEAR * 100 
                let apy_2 = (1 +((reward_2/1e18)/NUMBER_BLOCKS_PER_YEAR )) ** NUMBER_BLOCKS_PER_YEAR * 100 
                let apy_3 = (1 +((reward_3/1e18)/NUMBER_BLOCKS_PER_YEAR )) ** NUMBER_BLOCKS_PER_YEAR * 100 
                sessionStorage.setItem('apy_1', (apy_1).toFixed(2))
                sessionStorage.setItem('apy_2', (apy_2).toFixed(2))
                sessionStorage.setItem('apy_3', (apy_3).toFixed(2))


                let pendingReward1 = await master_contract.methods.pendingReward(0, Walletaddress).call()
                let pendingReward2 = await master_contract.methods.pendingReward(1, Walletaddress).call()
                let pendingReward3 = await master_contract.methods.pendingReward(2, Walletaddress).call()
                sessionStorage.setItem('pendingReward1', pendingReward1)
                sessionStorage.setItem('pendingReward2', pendingReward2)
                sessionStorage.setItem('pendingReward3', pendingReward3)

                //load user info from pools
                let lockOf = await master_contract.methods.lockOf( Walletaddress).call()
                sessionStorage.setItem('lockOf', lockOf)

                let Uinfo1 = await master_contract.methods.userInfo(0, Walletaddress).call()
                let Uinfo2 = await master_contract.methods.userInfo(1, Walletaddress).call()
                let Uinfo3 = await master_contract.methods.userInfo(2, Walletaddress).call()
                sessionStorage.setItem('Ustake1', (parseInt(Uinfo1[0])/1e18).toFixed(2))
                sessionStorage.setItem('Ustake2', (parseInt(Uinfo2[0])/1e18).toFixed(2))
                sessionStorage.setItem('Ustake3', (parseInt(Uinfo3[0])/1e18).toFixed(2))

                //check approvals
                let allowance_1 = await lp_contract_bnb.methods.allowance(Walletaddress, masterChefAddress).call()
                let allowance_2 = await lp_contract_busd.methods.allowance(Walletaddress, masterChefAddress).call()
                let allowance_3 = await lp_contract_cake.methods.allowance(Walletaddress, masterChefAddress).call()
                let balance_1 = await lp_contract_bnb.methods.balanceOf(Walletaddress).call()
                let balance_2 = await lp_contract_busd.methods.balanceOf(Walletaddress).call()
                let balance_3 = await lp_contract_cake.methods.balanceOf(Walletaddress).call()

                var approved_1,approved_2,approved_3
                if(allowance_1 < balance_1) {
                    approved_1 = "false"
                } else{
                    approved_1 = "true"
                }

                if(allowance_2 < balance_2) {
                    approved_2 = "false"
                } else{
                    approved_2 = "true"
                }

                if(allowance_3 < balance_3) {
                    approved_3 = "false"
                } else{
                    approved_3 = "true"
                }
                sessionStorage.setItem('approved_1', approved_1)
                sessionStorage.setItem('approved_2', approved_2)
                sessionStorage.setItem('approved_3', approved_3)
                sessionStorage.setItem('balance_1', balance_1)
                sessionStorage.setItem('balance_2', balance_2)
                sessionStorage.setItem('balance_3', balance_3)



            }
        }
            loader()
    }, [])



    const type = sessionStorage.getItem('type') || '';

    return (
        <div className="col-12 col-sm-2">
            <div className={"rightSide_Wrapper " + (themeColor === 'true' ? 'dark' : '')}>
                <div className="rightSide_heading mobileViewDis_none">
                    {(address || Walletaddress) ?
                        <h3>Your wallet</h3> :
                        <h3>Connect to a wallet</h3>
                    }
                </div>
                {(!Walletaddress && address === '') &&
                    <div className="wallet_wrapper mobileViewDis_none">
                        <div className="row">
                            <div className="col-4 col-sm-12 col-xl-6 text-center pos-r px-0" onClick={() => {
                                handleMetaMaskLogin()
                            }}>
                                <div className="single_wallet">
                                    <div className="wallet_image">
                                        <img src={walletOne} alt="wallet" />
                                    </div>
                                    <div className="wallet_title">
                                        <span>Metamask</span>
                                    </div>
                                    <div className="wallet_connect">
                                        <p className={" " + (themeColor === 'true' ? 'text-white' : '')}>Connect</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 col-sm-12 col-xl-6 text-center pos-r px-0" onClick={() => {
                                handleMetaMaskLogin()
                            }}>
                                <div className="single_wallet">
                                    <div className="wallet_image">
                                        <img src={walletTwo} alt="wallet" />
                                    </div>
                                    <div className="wallet_title">
                                        <span>ezDeFi</span>
                                    </div>
                                    <div className="wallet_connect">
                                        <p className={" " + (themeColor === 'true' ? 'text-white' : '')}>Connect</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 col-sm-12 col-xl-6 text-center pos-r px-0" onClick={() => {
                                handleWalletConnectLogin()
                            }}>
                                <div className="single_wallet">
                                    <div className="wallet_image">
                                        <img src={walletThree} alt="wallet" />
                                    </div>
                                    <div className="wallet_title">
                                        <span>WalletConnect</span>
                                    </div>
                                    <div className="wallet_connect ">
                                        <p className={" " + (themeColor === 'true' ? 'text-white' : '')}>Connect</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                {/* connect */}
                {(address || Walletaddress) &&
                    <div className="wallet_wrapper myWallet">
                        <div className="row">
                            <div className="col-12 mb">
                                <div className={"wallet_content " + (themeColor === 'true' ? 'dark' : '')}>
                                    <div className="wallet_image">
                                        {type === 'metamask' ?
                                            <img src={walletOne} alt="wallet" /> :
                                            type === 'walletconnect' ?
                                                <img src={walletThree} alt="wallet" /> :
                                                <img src={walletTwo} alt="wallet" />
                                        }
                                    </div>
                                    <div className={"wallet_title " + (themeColor === 'true' ? 'dark' : '')}>
                                        <span>Metamask</span>
                                    </div>
                                    <div className="wallet_logout" onClick={() => {
                                        sessionStorage.removeItem('Walletaddress');
                                        localStorage.clear()
                                        setAddress('')
                                        window.location.reload()
                                    }}>
                                        <img src={logoutDrak} alt="wallet logout" />
                                    </div>
                                    <div className="clr"></div>
                                </div>
                            </div>
                            <div className="col-12 mb" onClick={() => {
                            }}>
                                <div className={"wallet_status " + (themeColor === 'true' ? 'dark' : '')}>
                                    <div className="wallet_address">
                                        <span className="title">address</span>
                                        <span className="path " style={{ width: '90%', overflowWrap: 'break-word' }} >{Walletaddress}</span>
                                    </div>
                                    <div className="wallet_position">
                                        <span className="title">Released / Locked</span>
                                        <span className="position">No lock</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb">
                                <div className={"wallet_blance " + (themeColor === 'true' ? 'dark' : '')}>
                                    <span className="title">Balance</span>
                                    <span className="wallet">{Psybal} PSY</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                {/* end */}
            </div>
        </div>
    );
}

export default WalletConnectSide;