import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import BodyClassName from 'react-body-classname';
import {ADDRESS_PAGES, ADDRESS_V3, PAGE_HOME} from '../../constants';
import './Home.css';
import Citation from '../Lames/Citation';
import Lame_image_text_simple from '../Lames/Lame_image_text_simple';
import Lame_images from '../Lames/Lame_images';
import Flexible_center_text from '../Lames/Flexible_center_text';
import Homediorama from '../Homediorama';
import {RingLoader} from 'react-spinners';
import Img from 'react-image';
import {isMobile} from 'react-device-detect';
import VideoImages from './../VideoImages';
import Cta from './../Cta';
import {gen4} from "../../utils/keygen";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lames: [],
            pageHome: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                better_featured_image: {
                    source_url: ''
                }
            }
        };
    }

    componentDidMount() {
        let pageurl =  ADDRESS_V3 + 'pages/' + PAGE_HOME;
        console.log(pageurl);

        this.loadTxtpage();

        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                        lames: response.acf.content_page,
                    })
            });
    }

    loadTxtpage = () => {
        let {pageHome} = this.state;
        this.setState({loading: true});
        let pageurl = ADDRESS_PAGES + PAGE_HOME;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pageHome: response,
                    loading: false})
            })
            .catch(
                error => this.setState({
                    error,
                    loading: false
                })
            );
    };

    render() {
        let {lames, pageHome} = this.state;
        console.log(pageHome);
        let ls = lames.map((lien, index) => {
            if (lien.acf_fc_layout === 'lame_image_full_width') {
                return (
                    <section
                        key={index}
                        style= {{ backgroundImage:  `url(${lien.lifw_img.sizes.large})` }}
                        className="imgfw"
                    >
                    </section>
                )
            }

            if (lien.acf_fc_layout === 'lame_citation') {
                return (
                    <section className="container citation" key={index}>
                        <React.Fragment>
                            <Citation classe={lien.cit_small}  link={lien.cit_cit}  author={lien.cit_author} />
                        </React.Fragment>
                    </section>
                )
            }

            if (lien.acf_fc_layout === 'lame_image_text_simple') {
                return (
                    <section className="container lameimagetextsimple" key={index}>
                        <React.Fragment>
                            <Lame_image_text_simple
                                position={lien.lit_pos}
                                ratio={lien.lit_ratio}
                                img={lien.lit_img.sizes.medium_large}
                                imgF={lien.lit_img.sizes.large}
                                video={lien.lit_video}
                                cite={lien.its_cite}
                                text={lien.its_text}
                            />
                        </React.Fragment>
                    </section>
                )
            }

            if (lien.acf_fc_layout === 'lame_wysiwyg') {
                return (
                    <section className="container wysiwyg" key={gen4()}>
                        <div dangerouslySetInnerHTML={{__html: lien.wy_txt}}></div>
                    </section>
                )
            }

            if (lien.acf_fc_layout === 'lame_header_txt_cta') {
                return (
                    <div key={gen4()}>
                        <React.Fragment>
                            <Lame_image_text_simple
                                cta_bg={lien.cta_bg}
                                cta_txt={lien.cta_txt}
                                cta_link={lien.cta_link}
                                cta_target={lien.cta_target}
                                img={lien.htc_img.sizes.large}
                                text={lien.htc_text}
                                title={lien.htc_title}
                            />
                        </React.Fragment>
                    </div>
                );
            }

            if (lien.acf_fc_layout === 'lame_images') {
                return (
                    <React.Fragment>
                        <Lame_images
                            li_imgs={lien.li_imgs}
                        />
                    </React.Fragment>
                );
            }

            if (lien.acf_fc_layout === 'flexible-center-text') {
                return (
                    <React.Fragment>
                        <Flexible_center_text
                            title={lien.title}
                            subtitle={lien.subtitle}
                            content={lien.content}
                        />
                    </React.Fragment>
                )
            }
        });

        return (
            <div key={gen4()} className="body-wrapper">
                <BodyClassName className="homepage" />
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Nature Dioramas miniatures 1 35 from Jean Diorama - Distant Shores</title>
                    <meta name="description" content="This website shows the nature centered dioramas I have been building throughout the last part of 2017 and in 2018. The rules of the game are pretty simple : I bought a series of 3d boxes and I fill them with little scenes that must not be more than 2cm high."/>
                    <link rel="canonical" href="http://www.distant-shore.com/"/>
                </Helmet>

                <div className="header-wrapper">
                    <div key={pageHome.id} className="header-home" style= {{ backgroundImage: `url(${pageHome.better_featured_image.source_url})` }}>
{/*                        <Img
                            alt={pageHome.better_featured_image.alt_text}
                            src={[
                                pageHome.better_featured_image.source_url,
                            ]}
                            loader={
                                <RingLoader
                                    color={'#123abc'}
                                    loading={true}
                                />
                            }
                        />*/}
                        <div className="text">
                            <h1 dangerouslySetInnerHTML={{
                                __html: pageHome.title.rendered
                            }}/>
                            <div dangerouslySetInnerHTML={{
                                __html: pageHome.content.rendered
                            }}/>
                        </div>
                    </div>
                    {ls}
                </div>


                {/*      <div className="is-hidden-desktop accrochemobile">
        <div dangerouslySetInnerHTML={{
            __html: diorama.content.rendered
          }}/>
      </div>

      <img src={diorama.better_featured_image && diorama.better_featured_image.media_details.sizes.medium.source_url} alt={""}/>

      <div className="is-hidden-touch ">
        <img src={diorama.acf.masque_video} alt={""}/>
        <h1 className="index">
          <img src="http://www.distant-shores.com/wp-content/themes/seadiorama/img/distantshoresb.svg" width="800" alt="Distant Shores Dioramas" className="dislogo"/>
        </h1>

        <div className="video-background">
          <div className="video-foreground">
            <YouTube videoId={diorama.acf.video_url_react} opts={videoOptions} className="video-iframe" onReady={this._onReady} onEnd={this._onEnd}/>
          </div>
        </div>

      </div>*/}
                {/*      <div className="is-hidden-touch" style={divStyle}>

        <Marquee>
          {diorama.acf.marquee}
        </Marquee>
      </div>*/}
                <section className="container vignette">
                    <div className="column is-one-third">
                        Latest dioramas</div>
                    {        <React.Fragment>
                        <Homediorama/>
                    </React.Fragment>}
                </section>
            </div>);
    }
}
export default Home;
