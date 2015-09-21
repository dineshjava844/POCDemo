var customerView=function(){
    

return {
    
    render:function(custList){
       var template= _.template($('#cutomerPageTpl').html());
        $('#mainRegion').html(template());
        this.rendercustomerPanel(custList);
        this.addEvents();
    },
    renderCustomerDetail:function(custObj){
        var template= _.template($('#customerDetailTpl').html());
        $('#customerDetail').html(template(custObj));
    },
    rendercustomerPanel:function(custList){
        var template= _.template($('#customerPanelTpl').html());
        $('#customerPanel').html(template({'custList':custList}));
        this.addEvents();
    },
    addEvents:function(){
        var thisObj=this;
        $('#addNewCust').click(function(){
            $('#addCustModal').modal();
        }); 
        
        $('#addBtn').click(function(){
            var retObj=customerModel.addNewCustomer($('#custName').val(),$('#email').val(),"");
            if(!retObj.Iserror){
                $('#addCustModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                
                var custViewObj=new customerView();
                custViewObj.render(customerModel.getAllCustomers());
                 $('#errorDiv .sr-only').addClass('hide');
            }
            else{
                $('#errorDiv .sr-only').text(retObj.errMsg);
                $('#errorDiv').removeClass('hide');
            }
        });
        
        $('#cust_lst li').click(function(e){
            var email=$(e.currentTarget).find('.emaildata').text();
            thisObj.renderCustomerDetail(customerModel.getCustomerDetailByEmail(email));
        });
        
        $('#searchInput').keyup(function(e){
            var searchVal=$(this).val().trim();
            var custViewObj=new customerView();
            if(searchVal){
                
                custViewObj.rendercustomerPanel(customerModel.getCustomerDetailByName(searchVal));
            }else{
                custViewObj.rendercustomerPanel(customerModel.getAllCustomers());
            }
        });
    }
    
    
}

};