var customerModel=(function(){
    
var customer=function(name,email,profileSrc){
        this.name=name;
        this.email=email;
        this.profileSrc=profileSrc;
        
}
var customerList;
    
return{

    addNewCustomer:function(name,email,profileSrc){
        
        this.getAllCustomers();
        var customerObj=new customer(name,email,profileSrc);
        var errs=this.validate(customerObj);
        if(errs.length>0){
            var errMsg='';
            for(var i in errs)
                errMsg=errMsg+errs[i]+'\n';
            
            return {Iserror:true,errMsg:errMsg};
        }
        this.customerList.push(customerObj);
        localStorage.setItem('customerList',JSON.stringify(this.customerList));
        return {Iserror:false};    
    },
    
    getAllCustomers:function(){
        if(!this.customerList){
            var lst=localStorage.getItem('customerList');
            this.customerList=lst?JSON.parse(lst):[];
        }
        return this.customerList;
    },
    
    getCustomerDetailByEmail:function(email){
        var customerObj;
         for(var i=0;i<this.customerList.length;++i){
             if(this.customerList[i].email==email){
                customerObj=this.customerList[i];
                 break;
             }
                
         }
        return customerObj;
    },
    getCustomerDetailByName:function(name){
       return this.customerList.filter(function(obj){
            return obj.name.indexOf(name)>-1;
        })
    },
    validate:function(customerObj){
        var errMsg=[];
        var emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!emailRegEx.test(customerObj.email))
            errMsg.push('Email Id is not valid !!');
        for(var i=0;i<this.customerList.length;++i){
             if(this.customerList[i].email==customerObj.email){
                 errMsg.push('Email Id already exist !!');
                 break;
             }
         }
        return errMsg;
    }
}

})();
