
import React, { Component } from 'react';
import ReactGa from 'react-ga';
import Icon from '../icon';
import Slider from 'react-rangeslider';
import Countdown from 'react-countdown';
import 'react-rangeslider/lib/index.css'
import axios from 'axios';
import Header from '../../webpages/components/header';
import { withRouter } from 'react-router-dom';
import { getCalculateComsmos, getStatusURL } from "../../constants/url";
class Participate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            tcShow:false,
            volume: 0,
            ercAddress: '--',
            blockHeight: '--',
            totalStaked: '--',
            statkedOnAudit: '--',
            totalRewards: '--',
            estimatedRewards: '--',
            globalTotalStaked: 0,
            globalAuditStaked: 0,
            globalAuditStakedInt: 0,
            totalDistributed: '',
            delegateAudit:0,
            globalTotalStakedInt:0,
            delegateOther:0,
            errorAddress: false,
            copied: false,
            copyValue:false,
            notParticipantAddress:false,
            showDelegateModal:false,
            showDelegateCliModal:false,
            showMagicTxnClieModel:false,
            totalDistributedInt:0
        }
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleOninputChange = this.handleOninputChange.bind(this)
    }
    onCopy = () => {
        this.setState({copyValue : true})
        this.setState({copied: true});
        setTimeout(() => {
            this.setState({copyValue : false})
          }, 1000);
      };
    
    handleClose = () => {
        this.setState({ show: false });
        this.setState({ showDelegateModal: false });
        this.setState({ showDelegateCliModal: false });
        this.setState({ showMagicTxnClieModel: false });
    };

    handleTcModal = () => {
        this.setState({ tcShow: true });
    };
    handleDelegateModel = () => {
        this.setState({ showDelegateModal: true });
    };
    handleDelegateClieModel = () =>{
        this.setState({ showDelegateModal: false });
        this.setState({ showDelegateCliModal: true });
    }
    
    handleMagicTxnClieModel = () =>{
        this.setState({ show: false });
        this.setState({ showMagicTxnClieModel: true });
    }
    handleTerms = () => {
        this.setState({ tcShow: false });
        this.setState({ show: true });
    };
    handleCancelTerms = () => {
        this.setState({ tcShow: false });
        this.props.history.push('/StakeDropCosmos');
    };
   
    componentDidMount = () => {
        ReactGa.pageview(window.location.pathname + window.location.search);
        const Statusurl = getStatusURL();
        axios.get(Statusurl).then((statusResponse) => {
            
            const totalDistributed = 200000 -(statusResponse.data.totalDistributed / 1000000) 
            const worldTotalDelegations = (statusResponse.data.totalStakeDropGlobalDelegation);
            const worldAuditDelegations = (statusResponse.data.worldAuditDelegation);
            const worldGlobalDelegation = (statusResponse.data.worldGlobalDelegation / 1000000);
            this.setState({totalDistributedInt: totalDistributed}) 
            this.setState({worldGlobalDelegation: (Math.round(worldGlobalDelegation * 100) / 100).toLocaleString()})
            this.setState({globalTotalStakedInt: worldTotalDelegations}) 
            this.setState({globalAuditStakedInt: worldAuditDelegations }) 
            this.setState({totalDistributed: totalDistributed.toLocaleString()})
            this.setState({globalTotalStaked: (worldTotalDelegations / 1000000).toLocaleString()})
            this.setState({globalAuditStaked: (worldAuditDelegations /1000000).toLocaleString()})


        })
    }


    handleOninputChange(event) {
        const value = event.target.value 
        this.setState({ volume: value})
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ volume: event.target.value })
        }
        if (event.target.value >= 2000000) {
            this.setState({ volume: 2000000 })

        }
        if (event.target.value === '') {
            const delegateAudit = 0;
            const delegateOther = 0;
            this.setState({ delegateAudit: delegateAudit })
            this.setState({ delegateOther: delegateOther })
        } else {
            var utomsToDelegate = value * 1000000
            var delegateAudit = ((0.25 * utomsToDelegate / (this.state.globalAuditStakedInt + utomsToDelegate) +
                (0.75 * utomsToDelegate) / (this.state.globalTotalStakedInt + utomsToDelegate)) * this.state.totalDistributedInt);
            var delegateOther = ((0.75 * utomsToDelegate) / (this.state.globalTotalStakedInt + utomsToDelegate)) * this.state.totalDistributedInt;
            if (isNaN(delegateAudit)) {
                delegateAudit = 0;
            }
            if (isNaN(delegateOther)) {
                delegateOther = 0;
            }
            if (delegateAudit > 5000) {
                this.setState({ delegateAudit: 5000 })
            } else {
                this.setState({ delegateAudit: (Math.round(delegateAudit * 100) / 100).toFixed(2) })
            }
            if (delegateOther > 5000) {
                this.setState({ delegateOther: 5000 })
            } else {
                this.setState({ delegateOther: (Math.round(delegateOther * 100) / 100).toFixed(2) })
            }
        }
    }
        handleOnChange = (value) => {
        this.setState({ volume: value })
        var utomsToDelegate = value * 1000000
        var delegateAudit =  ((0.25 * utomsToDelegate/(this.state.globalAuditStakedInt + utomsToDelegate) + 
            (0.75 * utomsToDelegate)/(this.state.globalTotalStakedInt + utomsToDelegate))* this.state.totalDistributedInt);
        var delegateOther = ((0.75 * utomsToDelegate)/(this.state.globalTotalStakedInt + utomsToDelegate)) * this.state.totalDistributedInt;
        if(isNaN(delegateAudit)) {
            delegateAudit = 0;
        }
        if(isNaN(delegateOther)) {
            delegateOther = 0;
        }
        if(delegateAudit > 5000){
            this.setState({ delegateAudit:5000})
        }else{
            this.setState({ delegateAudit: (Math.round(delegateAudit * 100) / 100).toFixed(2)})
        }
        if(delegateOther > 5000){
            this.setState({ delegateOther:5000})
        }else{
            this.setState({ delegateOther: (Math.round(delegateOther * 100) / 100).toFixed(2)})
        }
    }   
    handleCalculate = e => {
        e.preventDefault();
        this.setState({ errorAddress: false })
        this.setState({ notParticipantAddress: false })
        const calAddress = e.target.cosmosAddress.value;
        var addressPrefix = calAddress.startsWith("cosmos");

    if (addressPrefix === true && calAddress.length === 45) {
        const url = getCalculateComsmos(calAddress)
        axios.get(url).then((result) => {
            const calculatedata = result.data;
            if (calculatedata.success === true) {
                const currentEarned = (calculatedata.received / 1000000);
                const yourEstimatedRewards = (calculatedata.estimated /1000000);
                this.setState({ ercAddress: calculatedata.ercAddress })
                this.setState({ blockHeight: calculatedata.magicTxHeight })
                this.setState({totalStaked: (calculatedata.globalDelegation/1000000).toLocaleString()})
                this.setState({statkedOnAudit: (calculatedata.auditDelegation/1000000).toLocaleString()})
                this.setState({ totalRewards: (Math.round(currentEarned * 100) / 100).toFixed(2)})
                this.setState({ estimatedRewards: (Math.round(yourEstimatedRewards * 100) / 100).toFixed(2)})
            } else {
                this.setState({ notParticipantAddress: true })
            }
        });
    }else {
        this.setState({ errorAddress: true })
    }
    
    };

    render() {
        
    
        const { volume } = this.state
      
        return (
            <div className="section-participate"> 
                <Header />
               
            <section className="participate-stakedrop">
                <div className="container">
                  
              
                    <div className="col-lg-12">
                    <p className="button-back" onClick={this.props.history.goBack}>     <Icon viewClass="arrow-right" icon="arrow-right" /> Back to Campaigns</p>
                        <div className="row">
                       
                            <div className="col-lg-4 section-campaign">
                                <div className="row campaign-maintwo">
                                    <div className="col-lg-12  header-section">
                                        <h5 className="heading-participate">Cosmos Stake Drop Campaign</h5>
                                    </div>
                                    <div className="row body-section">
                                        <div className="col-lg-12 card-content campaign-card">
                                            <div className="card-inner">
                                                <h6>Campaign Duration</h6>
                                                <h1>30 Days</h1>
                                            </div>
                                            <Icon viewClass="social_icon_imgg" icon="participate" />

                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo">
                                                <h6>Tokens to distribute</h6>
                                                <h1>200,000 XPRT</h1>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo">
                                                <h6>Start</h6>
                                                <h1>26th of October 2020 <span>Block Height: 3846001</span></h1>

                                            </div>
                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo end">
                                                <h6>End</h6>
                                                <h1>25th of November 2020<span>Block Height: 4206000</span></h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row campaign-maintwo second">
                                    <div className="col-lg-12  header-section">
                                        <h5 className="heading-participate two">Campaign Status</h5>
                                    </div>
                                    <div className="row body-section">
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo">
                                                <h6>Tokens left:</h6>
                                                 <h1>{this.state.totalDistributed} XPRT</h1>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo">
                                                <h6>Time left:</h6>
                                                <h1 className="countdown"><Countdown
                                                    date={1606348800000}
                                                    autoStart={true}
                                                /></h1>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo">
                                                <h6>Total Staked:</h6>
                                                <h1>{this.state.globalTotalStaked} ATOM <span>Total Active: {this.state.worldGlobalDelegation}</span></h1>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 card-content">
                                            <div className="participate-cardtwo end">
                                                <h6>Total Staked on AUDIT.one:</h6>
                                                <h1>{this.state.globalAuditStaked} ATOM</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 staking-second-section">
                                <div className="col-lg-12  cosmos-tutorial-section">
                                        <p className="">Cosmos StakeDrop Tutorial: <a href="https://notes.persistence.one/s/SzZKebecO"  target="_blank" rel="noopener noreferrer">How ATOM Holders Can Participate in StakeDrop? </a></p>
                                    </div>
                                <div className="col-lg-12 stakerow">
                                    <div className="col-lg-12  header-section">
                                        <h5 className="heading-participate">Calculate Your Estimated Rewards</h5>
                                    </div>
                                    <div className="body-section">
                                        <form onSubmit={this.handleCalculate}>

                                            <div className="inputstaking">
                                                <h5>Staking Address</h5>
                                                <input
                                                    type="text"
                                                    name="cosmosAddress"
                                                    id="cosmosAddress"
                                                    value={this.state.cosmosAddress}
                                                    onChange={this.handleAddressChange}
                                                    placeholder="Enter Address"
                                                    required

                                                />

                                            </div>
                                            
                                            {this.state.errorAddress ?
                                                <h6 className="valid-add">Enter Valid Address</h6>
                                                :
                                                ""
                                            }
                                              {this.state.notParticipantAddress ?
                                                <h6 className="valid-add">Not a stakedrop participant address, please send the magic transaction</h6>
                                                :
                                                ""
                                            }
                                            <div className="btn-calculate">
                                                <button type="submit" className="btn">Calculate</button>
                                            </div>
                                        </form>
                                        <div className="">
                                            <div className="inputstaking justify-start">
                                                <h5>ERC20 Address</h5>
                                                <h5 className="text-color">{this.state.ercAddress}</h5>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="inputstaking justify-start">
                                                <h5>Start Block Height</h5>
                                                <h5 className="text-color">{this.state.blockHeight}</h5>
                                            </div>
                                        </div>
                                        <div className="row common-cards">

                                            <div className="inputstaking bottom">
                                                <h5>Total Staked</h5>
                                                <h5 className="value">{this.state.totalStaked} ATOM</h5>
                                            </div>


                                            <div className="inputstaking bottom">
                                                <h5>Total Staked on AUDIT.one</h5>
                                                <h5 className="value">{this.state.statkedOnAudit} ATOM</h5>
                                            </div>

                                            <div className="inputstaking bottom">
                                                <h5>Total Rewards</h5>
                                                <h5 className="value">{this.state.totalRewards} XPRT</h5>
                                            </div>
                                            <div className="inputstaking bottom">
                                                <h5>Estimated Rewards</h5>
                                                <h5 className="value">{this.state.estimatedRewards} XPRT</h5>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-12 staking-right-bottom stakerow">
                                        <div className="col-lg-12  header-section">
                                            <h5 className="heading-participate">Participate</h5>
                                        </div>
                                        <div className="body-section">
                                            <div className="range-data">
                                                <p>How many ATOMs would you like to stake?</p>
                                               
                                                <input
                                                    type="text"
                                                    className="range-value"
                                                    value={volume}
                                                    onChange={this.handleOninputChange}
                                                   

                                                />
                                            </div>
                                            <div className="range-slider">
                                                <Slider
                                                    value={volume}
                                                    onChange={this.handleOnChange}
                                                    min={0}
                                                    max={2000000}
                                                    step={100}
                                                />
                                            </div>

                                            <div className="">
                                                <div className="row">
                                                    <div className="col-lg-12 delegate-sec">
                                                        <div className="inputstaking bottom">
                                                            <h5>If you delegate to AUDIT.one</h5>
                                                            <h5 className="value">{this.state.delegateAudit} XPRT</h5>
                                                        </div>
                                                      
                                                        <div className="inputstaking bottom">
                                                            <h5>to Other Validators</h5>
                                                            <h5 className="value">{this.state.delegateOther} XPRT</h5>
                                                        </div>
                                                  
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                           
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
      
            </section>
            </div>
        );
    }
}

export default withRouter(Participate);


