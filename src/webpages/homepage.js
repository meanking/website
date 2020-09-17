import React, { Component } from 'react';
import Header from './components/header';
import {connect} from 'react-redux';
import language from '../webpages/translationlang';
import Validator from './components/validator'
import MailChimp from './components/mailChimp'
import Products from './components/products'
import Slider from './components/slider'
import Footer from './components/footer'
import proudctBg from '../assets/product_bg.jpg'
import nfts from '../assets/nfts.png'
import colloterals from '../assets/colloterals.png'
import liquidpools from '../assets/liquidpools.png'
import whitepaper from '../whitepaper.pdf'
import Icon from './icon';


class homePage extends Component {
    componentDidMount() {
        document.body.classList = "";
        document.getElementById('nav-bar').classList.add('navbar-white');
    }

    render() {
        
        const { lang } = this.props;
        return (
            <React.Fragment>
                <Header />
                {/* Products Section */}
                <section className="section-1 bg-product product-padding" id="home" data-image-src={proudctBg}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 text-white mobile-head">
                                <h1 className="title">{language[lang].protocal_powering}</h1>
                                <p className="sub-title title-line">{language[lang].persistence_bridges_defi}</p>
                                <div className="col-lg-12">
                                    <div className="row text-muted mob-text-align">
                                        <ul className="list-unstyled first-section-social-icons">
                                            <a href="https://t.me/PersistenceOne" rel="noopener noreferrer" target="_blank" title="Announcements"><li><Icon viewClass="social_icon_imgg" icon="telegram-plane" /></li></a>
                                            <a href="https://t.me/PersistenceOneChat" rel="noopener noreferrer" target="_blank" title="Community Chat"><li><Icon viewClass="social_icon_imgg" icon="telegram-plane" /></li></a>
                                            <a href="https://github.com/persistenceOne" rel="noopener noreferrer" target="_blank" title="Github"> <li> <Icon viewClass="social_icon_imgg" icon="github-alt" /></li></a>
                                            <a href="https://www.linkedin.com/company/persistenceone/" rel="noopener noreferrer" target="_blank" title="LinkedIn"><li><Icon viewClass="social_icon_imgg" icon="linkedin" /></li></a>
                                            <a href="https://twitter.com/PersistenceOne" rel="noopener noreferrer" target="_blank" title="Twitter"><li><Icon viewClass="social_icon_imgg" icon="twitter-logo" /></li></a>
                                            <a href="https://medium.com/persistence-blog" rel="noopener noreferrer" target="_blank" title="Medium"><li><Icon viewClass="social_icon_imgg" icon="medium-m" /></li></a>
                                            <span className="line"></span>
                                            <a href={whitepaper} target="_blank" rel="noopener noreferrer" title="Whitepaper"><li className="whitepaper"><Icon viewClass="social_icon_imgg" icon="whitepaper" />{language[lang].whitepaper}</li></a>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sub-section">
                    <div className="container">
                        <div className="row">
                            <div className="margin-t-20 col-lg-4">
                                <div className="services-list">
                                    <div className="media">
                                        <img className="sub-service-icons" src={nfts} alt="nfts" />
                                        <div className="media-body ml-4">
                                            <h5>{language[lang].asset_tokenization}</h5>
                                            <p className="pt-2">{language[lang].tokenize_real_world_assets}</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="margin-t-20 col-lg-4">
                                <div className="services-list">
                                    <div className="media">
                                        <img className="sub-service-icons" src={colloterals} alt="colloterals" />
                                        <div className="media-body ml-4">
                                            <h5>{language[lang].asset_exchange}</h5>
                                            <p className="pt-2">{language[lang].cross_chanin_exchange}</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="margin-t-20 col-lg-4">
                                <div className="services-list">
                                    <div className="media">
                                        <img className="sub-service-icons" src={liquidpools} alt="liquidpools" />
                                        <div className="media-body ml-4">
                                            <h5>{language[lang].liquidity_aggregation}</h5>
                                            <p className="pt-2">{language[lang].invest_lend}</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="section-slider" id="products">
                    <h3>{language[lang].products}</h3>
                    <div className="container">
                        <div className="row head-slider">
                            <Slider />
                        </div>

                    </div>
                </section>
                <Products />

                <section className="validators-section" id="validators">
                    <h3>{language[lang].validators}</h3>
                    <div className="container">
                        <Validator />
                    </div>
                    <p>{language[lang].selected_list}<span className="second-p">{language[lang].selected_list_2}</span></p> 
                </section>

                <section className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <p>{language[lang].join_our_community}</p>
                            </div>
                            <div className="col-lg-6 form-container form-md">
                                <MailChimp />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />

            </React.Fragment>
        );
    }




}

const mapStateToProps = state => {
    return {
        lang: state.language.language,
    }
};

export default connect(mapStateToProps)(homePage);