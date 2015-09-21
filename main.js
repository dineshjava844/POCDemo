$(function(){
    
    var custViewObj=new customerView();
    custViewObj.render(customerModel.getAllCustomers());
    
});