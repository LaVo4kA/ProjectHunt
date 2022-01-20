import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export default function Home() {
    return(
        <>
            <main>
                <div className='frame5'>
                    <img className = "projectHunt" src="projectHunt.png"></img>
                    <div className='frame3'>
                        
                        <p className='loginLabel'>Зарегистрируйтесь, чтобы найти команду своей мечты</p>
                        <div className='frame9'>
                                <input className='nameInput' placeholder="Имя"></input>
                                <input className='secondNameInput' placeholder="Фамилия"></input>
                                <input className='emailInput' placeholder="Email"></input>
                                <input className='passwordInput' placeholder="Пароль"></input>
                                <input className='passwordSecondInput' placeholder="Повторите пароль"></input>
                        </div>
                        <div className='frame1'>
                            <button className='loginButton'>Зарегистрироваться</button>
                            <button className='registrationButton'>Войти</button>
                        </div>
        
                    </div>
                    
                </div>
            </main>

            <style jsx> {`
                .passwordSecondInput {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 384px;
                    height: 48px;
                    left: 0px;
                    top: 252px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 4;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 15px 0px;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px; 

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/contentColor 20 */

           
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    border-radius: 20px;
                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 8px 0px;
                }


                .secondNameInput {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 384px;
                    height: 48px;
                    left: 0px;
                    top: 63px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 15px 0px;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px; 

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/contentColor 20 */

           
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    border-radius: 20px;
                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 8px 0px;
                }
                .nameInput {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 384px;
                    height: 48px;
                    left: 0px;
                    top: 0px;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px; 

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/contentColor 20 */

           
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    border-radius: 20px;
                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 8px 0px;
                }

                input:focus {
                    
                    outline: 0;
                    outline-offset: 0;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/highlightColor */

                    
                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    border: 1px solid #9F87FF;
                    box-sizing: border-box;
                    /* highlightColor 20 */

                    box-shadow: 0px 0px 0px 3px rgba(159, 135, 255, 0.2);
                    border-radius: 20px;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                }

                .frame1 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;

                    position: static;
                    width: 250px;
                    height: 90px;
                    left: 98px;
                    top: 265px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 2;
                    flex-grow: 0;
                    margin: 30px 0px;
                }
                .passwordInput {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: 0px;
                    top: 63px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    flex-grow: 0;
                    margin: 15px 0px;
                    /* Hint */

                    /*не нажатая кнопка */

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px; 

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/contentColor 20 */

                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    border-radius: 20px;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 8px 0px;

                }
                .emailInput {
                
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: 0px;
                    top: 0px;

                    /* Hint */


                    /*Нажатая кнопка */
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 13px 16px;

                    position: static;
                    width: 375px;
                    height: 48px;
                    left: calc(50% - 375px/2);
                    top: 0px; 

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;

                    /* Inputs/whiteColor */

                    background: #FFFFFF;
                    /* Inputs/contentColor 20 */

           
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    border-radius: 20px;
                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 8px 0px;
                    /*Конец */

                    
                }
                .loginLabel {
                    position: static;
                    width: 384px;
                    height: 34px;
                    left: 0px;
                    top: 0px;
                    /* Desktop/Header 4 */

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 28.13px;
                    line-height: 110%;
                    /* identical to box height, or 34px */

                    text-align: center;

                    /* Grays/Black Pearl #040D14 */

                    color: #040D14;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 30px 0px;
                }
                .frame9 {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 375px;
                    height: 111px;
                    left: 35.5px;
                    top: 124px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    flex-grow: 0;
                    margin: 30px 0px;

                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px;

                    position: static;
                    width: 384px;
                    height: 300px;
                    left: 35.5px;
                    top: 124px;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
             
                    flex-grow: 0;
                    margin: 20px 0px;
                }
                .registrationButton {
 
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 15px 50px;

                    position: static;
                    left: 0%;
                    right: %;
                    top: 0%;
                    bottom: 0%;

                    border: none;
                    background: #FFFFFF;

                    /* Desktop/Body 1 */

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;
                    line-height: 140%;
                    /* or 25px */

                    text-align: center;
                    letter-spacing: 0.25px;

                    /* PH/Fucjsia */

                    color: #6667AB;
                }
                .loginButton {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;
                    
                    position: static;
                    width: 250px;
                    height: 50px;
                    left: 0px;
                    top: 0px;

                    /* PH/Fucjsia */
                
                    user-select: none;
                    background: #6667AB;
                    border-radius: 20px;
                    border: 1px solid #DDDEDF;
                    box-sizing: border-box;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 0px 15px;

                    font-family: Arial Narrow;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 100%;
                    /* identical to box height, or 18px */

                    text-align: center;

                    color: #FFFFFF;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 0px 0px;
                }
                .prjectHunt {
                    position: static;
                    left: 6.73%;
                    right: 6.73%;
                    top: 0%;
                    bottom: 73.61%;


                    /* Inside Auto Layout */

                    flex: none;
                    order: 0;
                    flex-grow: 0;
                    margin: 13px 0px;
                }
                .frame5 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;

                    position: absolute;
                    width: 446px;
                    height: 581.43px;
                    left: 737px;
                    top: 160px;
                }
                .frame3 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 60px 30px;

                    position: static;
                    width: 446px;
                    height: 500px;
                    left: calc(50% - 446px/2);
                    top: calc(50% - 415px/2 + 83.22px);

                    background: #FFFFFF;
                    /* big */

                    box-shadow: 0px 20px 50px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 20px;

                    /* Inside Auto Layout */

                    flex: none;
                    order: 1;
                    flex-grow: 0;
                    margin: 13px 0px;
                }
            `}
            </style>
            
        </>
    )
}