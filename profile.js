import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export default function Home() {
    return(
        <>
            <nav>
                <Link href = {'/'}><p className = "hunt">Hunt</p></Link>
                <Link href = {'/'}><p className = "project">project</p></Link>
                <img className = "notificationsImage" src="img1.jpg"></img>
                <div className = "nameBlock">
                    <img className = "iconImage" src="icon.jpg"></img>
                    <p className = "nameUser">Галиев Артем</p>
                </div>
            </nav>
            <main>
            <div className = "mainBlock">
                <h1>Профиль</h1>
                <div className='profileCart'>
                    <div className='user'>
                        <img className = "iconUser" src="userIcon.png"></img>
                        <p className = "nameTextUser">Галиев Артем</p>
                    </div>
                </div>
            </div>
            </main>
            <style jsx> {`
                .user {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 471px;
                    height: 200px;
                    left: 76.5px;
                    top: 41px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 10px 0px;
                }
                .nameTextUser {
                    position: static;
                    width: 221px;
                    height: 176px;
                    left: 250px;
                    top: 0px;

                    /* Desktop/Header 2 */

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 43.95px;
                    line-height: 100%;
                    /* or 44px */

                    letter-spacing: 0.25px;

                    color: #000000;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    flex-grow: 0;
                    margin: 0px 50px;
                }
                .iconUser {
                    position: static;
                    width: 200px;
                    height: 200px;
                    left: 0px;
                    top: 0px;

                    background: linear-gradient(0deg, #FFC9B3 0%, #FFD2C2 100%);
                    border-radius: 100px;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 0px 50px;
                }
                .profileCart {
                    
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 41px 21px;

                    position: absolute;
                    width: 624px;
                    height: 282px;
                    left: 0px;
                    top: 100px;

                    /* Grays/White #FFFFFF */

                    background: #ffffff;
                    border-radius: 20px;
                }
                  .mainBlock {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;
            
                    position: absolute;
                    width: 1218px;
                    height: 701.06px;
                    left: 351px;
                    top: 151px;
                  }
                  h1 {
                    position: static;
                    width: 1218px;
                    height: 66px;
                    left: 0px;
                    top: 0px;
            
                    /* Desktop/Header 1 */
            
                    font-family: Helvetica;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 55.93px;
                    line-height: 0%;
                    /* identical to box height, or 66px */
            
            
            
            
                    color: #1F1E29;
                  }
            .nameUser {
                position: static;
                width: 190px;
                height: 25px;
                left: 18px;
                top: 23.5px;
        
                /* Desktop/Body 1 */
        
                font-family: Arial Narrow;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 40%;
                /* or 25px */
        
                text-align: center;
                letter-spacing: 0.25px;
        
                /* Grays/Arsenic #3D464D */
        
                color: #3D464D;
        
        
                /* Inside Auto Layout */
        
                flex: none;
                order: 0;
                flex-grow: 0;
                margin: 0px 13px;
              }
                  .iconImage {
                    position: absolute;
                    width: 48px;
                    height: 48px;
                    left: 85%;
                    top: 15%;
                  }
                  .nameBlock {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 13px;
                    
                    position: absolute;
                    width: 282px;
                    height: 72px;
                    left: 1287px;
                    top: 0px;
                  }
                      .notificationsImage {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        left: 71%;
                        top: 25%;
                      }
                      nav {
                        position: absolute;
                        width: 1920px;
                        height: 72px;
                        left: 0px;
                        top: 0px;
                
                        background: #FFFFFF;
                        box-shadow: inset 0px -2px 0px rgba(123, 97, 255, 0.5);
                      }
                      img {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        left: 1247px;
                        top: 16px;
                      }
                      .hunt {
                        position: absolute;
                        left: 22.55%;
                        right: 72.45%;
                        top: -5%;
                        bottom: -1.05%;
                
                        
                        font-family: Arial Narrow;
                        font-style: normal;
                        font-weight: 600;
                        font-size: 33.6479px;
                        line-height: 46px;
                        /* or 133% */
                        
                        text-align: center;
                        letter-spacing: -0.055em;
                        user-select: none;
                        color: #EF0D0D;
                      }
                      .project {
                        position: absolute;
                        left: 18.28%;
                        right: 73.93%;
                        top: -40.78%;
                        bottom: 100.71%;
                
                        font-family: Arial Narrow;
                        font-style: normal;
                        font-weight: 600;
                        font-size: 33.6479px;
                        line-height: 46px;
                        /* or 133% */
                
                        text-align: center;
                        user-select: none;
                        color: #000000;
                      }
            `}
            </style>
        </>
    )
}