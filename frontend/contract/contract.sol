pragma solidity ^0.5.1;

contract Promissory{
    
    struct Promissory_note {
        address creditor_addr;
        address debtor_addr;
        bytes32 note_hash;
        bool creditor_confirmed;
        bool debtor_confirmed;
    }
    
    mapping(bytes32 => Promissory_note) public notes;
    
    event logNewNote(address creditor, address debtor, bytes32 _hash);
    event logConfirmed(address sender, bytes32 _hash);
    event LogNoteExist(bytes32 _hash, int confirmed);
    
    function create_note(address creditor, address debtor, bytes32 _hash) public {
        //require(msg.sender != address(0));
        //require(debtor != address(0));
        Promissory_note storage newNote = notes[_hash];
        newNote.creditor_addr = creditor;
        newNote.debtor_addr = debtor;
        newNote.note_hash = _hash;
        emit logNewNote(creditor, debtor, _hash);
    }
    
    function confirm_note(address sender, bytes32 _hash) public{
        if(notes[_hash].creditor_addr == sender && notes[_hash].creditor_confirmed == false){
            //require(notes[creditor].creditor_confirmed == false);
            notes[_hash].creditor_confirmed = true;
        }
        else if(notes[_hash].debtor_addr == sender && notes[_hash].debtor_confirmed == false){
            //require(notes[creditor].creditor_confirmed == false);
            notes[_hash].debtor_confirmed = true;
        }
        if(notes[_hash].creditor_confirmed && notes[_hash].debtor_confirmed){
            emit logConfirmed(msg.sender, notes[_hash].note_hash);
        }
    }
    
    function check_note(bytes32 _hash) public{
        //require(creditor != address(0));
        //require(debtor != address(0));
        if(notes[_hash].creditor_addr == address(0)) emit LogNoteExist(0, 0);
        else{
            if(notes[_hash].debtor_addr == address(0)) emit LogNoteExist(0, 0);
            if(notes[_hash].creditor_confirmed && notes[_hash].debtor_confirmed) emit LogNoteExist(_hash, 1);
            else emit LogNoteExist(_hash, 0);
        }
    }
    
     /**return이 아니라 event를 사용해야 함. */
/**
   function check_note(bytes32 _hash) public view returns (int number){
        //require(creditor != address(0));
        //require(debtor != address(0));
        if(notes[_hash].creditor_addr == address(0)) number = 0;
        else{
            if(notes[_hash].debtor_addr == address(0)) number = 0;
            if(notes[_hash].creditor_confirmed && notes[_hash].debtor_confirmed) number = 1;
            else number = 0;
        }
    } //return이 아니라 event를 사용해야 함.
 */
    
}
