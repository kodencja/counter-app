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

   selectButtons = async ()=>{
    try{
      const buttons = document.querySelectorAll("button:not(.btn-alert)");
      const buttonsTab = [...buttons];
      this.setState({buttons: buttonsTab});
    } catch(err){
      console.log(err);
    }

  }

  callBtns = async (flag)=>{
    // console.log(flag);
    if(this.state.buttons === null) await this.selectButtons();
    flag ? await this.unableButtons() : await this.disableButtons();
  }

  disableButtons = async() =>{
    this.state.buttons.forEach(el => {
      el.setAttribute('disabled', 'disabled');
    });
  }

  unSelectBtns = async ()=>{
    this.setState({buttons: null})
  }

  unableButtons = async () =>{
    await this.state.buttons.forEach(el => {
      el.removeAttribute('disabled');
    });
    await this.unSelectBtns();
  }

  closeBox = async () => {
    await this.callBtns(this.state.active);
    const activeVal = this.state.active;
    this.setState({ active: !activeVal });
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
      await this.callBtns(this.state.active);
      await this.closeBox();
  }


  handleIncrement = (counter) => {
    if(counter.hasOwnProperty("adult") && counter.adult === false){
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
