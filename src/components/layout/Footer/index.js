import React from 'react';
import icon from '../../../assets/images1/persistencefooterlogo.svg'
import Mailchimp from "./MailChimp";
import ReactGa from 'react-ga';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Icon from "../../Icon";
import { useTranslation } from "react-i18next";
import {
    AUDIT_URL,
    ASSETMANTLE_TWITTER_URL,
    PERSISTENCEONE_DISCORD_URL,
    PSTAKE_TWITTER_URL,
    PERSISTENCEONE_TWITTER_URL,
    PERSISTENCEONE_TELEGRAM_URL,
    PERSISTENCEONE_TELEGRAM_ANNOUNCEMENTS_URL,
    PERSISTENCEONE_REDDIT_URL,
    PERSISTENCEONE_YOUTUBE_URL,
    PERSISTENCEONE_MEDIUM_URL,
    PERSISTENCEONE_LINKEDIN_URL
} from "../../../constants/config";


const socialList = [
    {
        url: PERSISTENCEONE_TWITTER_URL,
        iconName: 'twitter-logo',
        tooltip: 'twitter'
    },
    {
        url: PERSISTENCEONE_TELEGRAM_URL,
        iconName: 'telegram-plane',
        tooltip: 'telegram'
    },
    {
        url:  PERSISTENCEONE_TELEGRAM_ANNOUNCEMENTS_URL ,
        iconName: 'announcements',
        tooltip: 'announcements'
    }, {
        url:  PERSISTENCEONE_DISCORD_URL ,
        iconName: 'discord',
        tooltip: 'discord'
    }, {
        url: PERSISTENCEONE_REDDIT_URL ,
        iconName: 'reddit-round',
        tooltip: 'reddit'
    }, {
        url:  PERSISTENCEONE_YOUTUBE_URL ,
        iconName: 'youtube',
        tooltip: 'youtube'
    }, {
        url:  PERSISTENCEONE_MEDIUM_URL ,
        iconName: 'medium-m',
        tooltip: 'medium'
    }, {
        url: PERSISTENCEONE_LINKEDIN_URL ,
        iconName: 'linkedin-footer',
        tooltip: 'linkedIn'
    },
];

const Footer = (props) => {
    const { t } = useTranslation();

    const socialIcon = (iconName) => {
        ReactGa.event({
            category: 'Sociallinks',
            action: 'Clicked on ' + iconName
        })
    }

    return (
        <>


            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-12">
                            <div className="row m-0">
                                <div className="col-lg-4 col-md-4 col-sm-12 margin-t-20 ">
                                    <h6>{t("General")}</h6>
                                    <div className="text-muted mt-30">
                                        <ul className="list-unstyled footer-list">
                                            <li><a href="https://github.com/persistenceOne/persistenceCore" target="_blank"
                                                   rel="noopener noreferrer">XPRT</a></li>
                                            <li><a href="/xprttoken" target="_blank"
                                                   rel="noopener noreferrer">Ecosystem</a></li>
                                            <li><a href="https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ" target="_blank"
                                                rel="noopener noreferrer">Careers</a></li>
                                            <li><a href="https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ" target="_blank"
                                                   rel="noopener noreferrer">Press & Brand</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 margin-t-20">
                                    <h6>{t("Community")}</h6>
                                    <div className="text-muted mt-30">
                                        <ul className="list-unstyled footer-list">
                                            <li><a href={PSTAKE_TWITTER_URL} rel="noopener noreferrer" target="_blank">{t("Grants ")}</a></li>
                                            <li><a href={AUDIT_URL} rel="noopener noreferrer" target="_blank">{t("Guardians Program")}</a></li>
                                            <li><a href={ASSETMANTLE_TWITTER_URL} rel="noopener noreferrer" target="_blank">{t("Foundation Delegation")}</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 margin-t-20">
                                    <h6>{t("Contact Us")}</h6>
                                    <div className="contact-us">
                                        <div>
                                            <div className="contact-box">
                                                <div className="form-container mt-30">
                                                    <p className="footer-text">{t("SUBSCRIBE_NOTE")}</p>
                                                    <Mailchimp />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 m-0 row">
                            <div className="contact-us">
                                <div>
                                    <div className="contact-box">
                                        <h6 className="title"> {t("FOLLOW_US")}</h6>

                                    </div>
                                    <div className="social-links-section">
                                        <ul className="list-unstyled footer-list">
                                            {
                                                socialList.map((item, index) => (
                                                    <OverlayTrigger
                                                        key={item.iconName}
                                                        placement="bottom"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${item.iconName}}`}>
                                                                {item.tooltip}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <a href={item.url} onClick={() => socialIcon(item.iconName)} rel="noopener noreferrer"
                                                            target="_blank"><Icon viewClass="social_icon_imgg"
                                                                icon={item.iconName} /></a>
                                                    </OverlayTrigger>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container footer-bottom-section">
                    <div className="col-lg-6 footer-logo-section container ">
                        <img className="dark-logo" src={icon} alt="icon-logo" title="logo" />&emsp;
                        <span className="copy-rights mb-sm-0">{new Date().getFullYear()} © {t("Persistence.one | Privacy | Security")}</span>

                    </div>
                    <div className={'col-lg-6 text-right'}>
                        <p className="copy-rights mb-sm-0">Built with </p>
                    </div>
                </div>
            </footer>
        </>
    )
};


export default Footer;
