# transfer component
* I'm thinking it would be good to have all 3 accounts numbers as fields
  * making them easily accessible OnInit
* should also have the ngModels of what account is selected from the dropdown for FROM and
  what account is selected TO and for the input of amount.
  * could fromAccount and toAccount be numbers? so like the button says the name of the account, but the value is the account number?
* constructor should have the service class injected
* onInit will get the account numbers because all balance based methods utilize account numbers
* methods
  * withdraw
    * check if enough money in account to withdraw
  * deposit
  * transfer
    * check if enough money in account to transfer from
  
* buttons
  * home
  * help
  * submit
  

## Need To Know
* 
  
## 3:30
* withdraw is working, but I need to make it flexible for whatever account is picked
* then I can fix deposit
