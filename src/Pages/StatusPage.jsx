import React from 'react'
import useScreenSize from './../Functions/ScreenSize';




function StatusPage ({teste}) {
    const screenSize = useScreenSize();

return (
    <div style={{fontSize:screenSize.font, margin:screenSize.verticalPadding, textAlign:'justify', 
                  paddingTop:screenSize.verticalPadding,
                  paddingBottom:screenSize.verticalPadding,
                  paddingRight:screenSize.horizontalPadding,
                  paddingLeft:screenSize.horizontalPadding}}>
          <div>Teste {teste}</div>
          <h1> {window.location.pathname.substring(1)}</h1>
          <br/><br/>
          <h2> Screen Status Values:</h2>
          <br/>
          <div> Width = {screenSize.width}          </div>
          <div> Height = {screenSize.height}          </div>
          <div> Font = {screenSize.font}</div>
          <div> Vertical Padding = {screenSize.verticalPadding}</div>
          <div> Horizontal Padding = {screenSize.horizontalPadding}</div>
          <div> Char Density = {screenSize.charDensity}    </div>

          
    </div>
  )
}

export default StatusPage;