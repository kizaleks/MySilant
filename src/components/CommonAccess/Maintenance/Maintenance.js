
    this.setState({ data: [] });
    const token = localStorage.getItem('Token')
    let сategory="";
    let company="";
    //сategory ="manufacturer" 
     if(localStorage.getItem('сategory')=="Менеджер"){
      сategory ="manufacturer" 
      company = localStorage.getItem('company_id')
    }
     if(localStorage.getItem('сategory')=="Сервисная организация"){
      сategory ="service_company"
      company = localStorage.getItem('company_name')
    }
     if(localStorage.getItem('сategory')=="Клиент"){
      сategory ="client"
      company= localStorage.getItem('company_id')
    }
     const company_id = localStorage.getItem('company_id')
    //alert(this.state.url+"?type_company="+сategory+"&id_company="+company_id)          
    this.setState({loding: true});
    //?id="+props
    if(this.props.formmode=="full"){
     // this.setState({loding: true});
     
    axios.get(this.state.url+"?typecompany="+сategory+"&company="+company).then(res => {   
        this.setState({ data: res.data}); 
        localStorage.setItem('data', res.data)              
          }).catch(function (error) {     })  
        } 
   if(this.props.formmode=="car"){
    
    this.setState({ selectedId: this.props.car});
    axios.get(this.state.url+"?car="+this.props.car).then(res => {   
        this.setState({ data: res.data});                    
          }).catch(function (error) {  })  
        }       
  };
  


  render() {
    const options = {
      height: 300,
      width:500,
      //movableRows: true,
      //selectable: true,
      

      rowClick: (e, row) => {
        const id =row.getData().id; 
        this.setState({ selectedId: id});
        this.setState({ mode: "edit" }) 
        this.setState({ in_detail: true })  
         },      
    };
    return (
      <div>      
      <h1>Информация по ТО  
      </h1>
      {(!this.state.loding)&& 
      this.setData()
  } 
      {(!this.state.in_detail)&&
        <ReactTabulator columns={this.columns} data={this.state.data} events={{
            rowClick: this.rowClick
          }} options={options} />
        } 
          {(this.state.in_detail)&&
         <MaintenanceForm in_detail={this.briefly} item={this.state.selectedId} mode={this.state.mode} 
         formmode={this.props.formmode} car={this.props.car} /> 
          }  
          <label className='Button'>
             {(!this.state.in_detail)&&
        <button onClick={this.create}>Добавить</button>  }
            </label>         
       

      </div>
    );
  }
}

export default Maintenance;
