import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import Counters from './components/counters';
import Response from './components/response';
import DialogBox from './components/dialogbox';

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0, name: "Coffe machine DeLonghi S 22.110.B", price: 200},
      { id: 2, value: 1, name: "Earl Grey Tea, 100 Tea Bags", price: 10},
      { id: 3, value: 0, name: "Every Day Tea, 100 Tea Bags", price: 12},
      { id: 4, value: 0, name: "Bordeaux 2018", price: 20, adult: false}
    ],
    active: false,
    buttons: null
  };

  selectButtons = ()=>{
    // console.log('3 selectButtons');
    return new Promise((resolve, reject)=>{
        const buttons = document.querySelectorAll("button:not(.btn-alert)");
        const buttonsTab = [...buttons];
        if(buttonsTab != null){
          resolve( this.setState({buttons: buttonsTab}) );
        } else {
          reject(new Error('Error to catch buttons .btn-alert'));
        }
    })
  }

  unSelectBtns = ()=>{
    // console.log('9 unSelectBtns');
    this.setState({buttons: null})
  }

  unableButtons = () =>{
    // console.log('7 unableButtons');
    return new Promise( (resolve,reject)=>{
      resolve( this.state.buttons.forEach(el => {
       el.removeAttribute('disabled');
      }));
    });
  }

  disableButtons = () =>{
    // console.log('7d disableButtons');
    return new Promise((resolve, reject)=>{
      resolve( this.state.buttons.forEach(el => {
        el.setAttribute('disabled', 'disabled');
      }) );
    })
  }

  callBtnUnOrDisable = (flag)=>{
    // console.log('5 callBtnUnOrDisable');
    return new Promise( async(resolve, reject)=>{
      if(flag){
        // console.log('6 callBtnUnable');
        resolve( await this.unableButtons(),
        // console.log('8 callBtnUnable'),
        this.unSelectBtns()
        )
      } else{
        // console.log('6d callBtnDisable');
        resolve( await this.disableButtons() );
      }
    })

  }

  callBtns =  (flag)=>{
    try{
      // console.log('2 callBtns');
      return new Promise(async (resolve, reject)=>{
        if(this.state.buttons === null) {
          // console.log('2,5 callBtns');
          await this.selectButtons();
        }
        // console.log('4 callBtns');
        resolve( await this.callBtnUnOrDisable(flag) );
      })
    } catch(err){
      console.log(new Error(err));
    }
  }

  closeBox = async () => {
    try{
      // console.log('start closeBox');
      await this.callBtns(this.state.active);
  
      // console.log('last closeBox');
      const activeVal = this.state.active;
      this.setState({ active: !activeVal });
    } catch(err){
      console.log(new Error(err));
    }

  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      if(c.hasOwnProperty("adult")) c.adult = false;
      return c;
    });
    this.setState({ counters });
  };


  showOrHideClass =() => {
    return this.state.active ? "d-block" : "d-none";
  }

  handleBoxAnswer = (e) => {
   return(this.state.counters.map((countElem) => {
      if (countElem.hasOwnProperty("adult")) {
        this.handleAdultAnswer(countElem, e);
      }
      return 0;
    }) );
  };

  handleAdultAnswer = async (countElem, e)=>{
    const counters = [...this.state.counters];
      const ind = counters.indexOf(countElem);
      if(e.target.id === "no" && counters[ind].adult === true) {
        counters[ind].adult = false;
        this.setState({counters});
      } else if (e.target.id === "yes" && counters[ind].adult === false){
        counters[ind].adult = true;
        this.setState({counters});
      }
      // console.log('handleAdultAnswer check');
      await this.closeBox();
  }


  handleIncrement = (counter) => {
    if(counter.hasOwnProperty("adult") && counter.adult === false){
      // console.log('handleIncrement check');
      this.callBtns(this.state.active);
      this.setState({active: true});
    } else {
      const counters = [...this.state.counters];
      const ind = counters.indexOf(counter);
      counters[ind] = { ...counter };
      if(counters[ind].value <10){
        counters[ind].value++;
        this.setState({ counters: counters });
      } 
    }
  };

  handleMinus = (counter) => {
    const cntrs = this.state.counters;
    const index = cntrs.indexOf(counter);
    if(cntrs[index].value <= 0) {
      return
    } else {
      cntrs[index].value--;
      this.setState({counters: cntrs}) 
    }
 
  }

  handleDelete = (id) => {
    const counters = this.state.counters.filter((c) => c.id !== id);
    this.setState({ counters });
  };

  handleSumup = () => {
    return (
              this.state.counters.reduce( (c1,c2) => {
              return c1 +c2.value;
              },0)
           )
  }

  handlePrice = () => {
    return (
      this.state.counters.reduce( (c1,c2) => {
        return ((c1)+(c2.price * c2.value));
      }, 0)
    )
  }

  tooMuchFormat = () => {
    let msg="";

      if((this.state.counters.filter( (c) => c.value >9).length)>0){
        msg= "To get wholesales prices of our products you are more than welcome in our office or to contact with our online consultant to get lower prices";
      } else if((this.state.counters.filter( (c) => c.value <=0).length)>=(this.state.counters.length)){
        msg = "Let's buy more than zero";
      } else msg = "Retail sales prices";

      return msg;
  }

  handleWholesale =() =>{
    return this.state.counters.filter( (c) => c.value >9).length;
  }

  handleZero=()=>{
    return this.state.counters.filter( c => c.value>0).length;
  }

handleDisbale =(e)=>{
  console.log(e.target.className);
  return false;
}

  render () {

  return (
    <React.Fragment>
    <NavBar 
    onSumup={this.handleSumup()}
    onPrice={this.handlePrice()}
    totalCounters={this.state.counters.filter(c => c.value >0).length}
    />
    <main className="m-0 main disable">
      <Counters 
      kounters={this.state.counters} 
      onReset={this.handleReset} 
      onIncrement={this.handleIncrement} 
      onDelete={this.handleDelete} 
      onMinus={this.handleMinus}
      onDisable={this.handleDisbale}
      >
        <DialogBox countElement={this.state.counters} onAdultNo={this.handleAdultNo} onShowOrHideClass={this.showOrHideClass} onCloseBox={this.closeBox} onBoxAnswer={this.handleBoxAnswer}  />
      </Counters>
    </main>
    <Response onTooMuchFormat={this.tooMuchFormat()} onWholesale={this.handleWholesale()} onZero={this.handleZero()} />
    </React.Fragment>
  );
  }
}

export default App;
