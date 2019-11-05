pragma solidity ^0.5.1;

contract Promissory{
    
    struct Promissory_note {
        address creditor_addr;
        address debtor_addr;
        address note_hash;
        bool creditor_confirmed;
        bool debtor_confirmed;
    }
    
    mapping(address => Promissory_note) public notes;
    
    event logNewNote(address creditor, address debtor, address _hash);
    event logConfirmed(address sender, address _hash);
    
    
    function create_note(address creditor, address debtor, address _hash) public {
        //require(msg.sender != address(0));
        //require(debtor != address(0));
        Promissory_note storage newNote = notes[_hash];
        newNote.creditor_addr = creditor;
        newNote.debtor_addr = debtor;
        newNote.note_hash = _hash;
        emit logNewNote(creditor, debtor, _hash);
    }
    
    function confirm_note(address sender, address _hash) public{
        if(notes[_hash].creditor_addr == sender && notes[_hash].creditor_confirmed == false){
            //require(notes[creditor].creditor_confirmed == false);
            notes[_hash].creditor_confirmed = true;
        }
        else if(notes[_hash].debtor_addr == sender && notes[_hash].creditor_confirmed == false){
            //require(notes[creditor].creditor_confirmed == false);
            notes[_hash].debtor_confirmed = true;
        }
        if(notes[_hash].creditor_confirmed && notes[_hash].debtor_confirmed){
            emit logConfirmed(msg.sender, notes[_hash].note_hash);
        }
    }
    
    function check_note(address _hash) public view returns (address number){
        //require(creditor != address(0));
        //require(debtor != address(0));
        if(notes[_hash].creditor_addr == address(0)) number = address(0);
        else{
            if(notes[_hash].creditor_addr == address(0)) number = address(0);
            if(notes[_hash].debtor_addr == address(0)) number = address(0);
            if(notes[_hash].creditor_confirmed && notes[_hash].debtor_confirmed) number = notes[_hash].debtor_addr;
            else number = address(0);
        }
    }
    
}
