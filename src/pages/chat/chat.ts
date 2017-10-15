import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,Content } from 'ionic-angular';
import * as io from 'socket.io-client';
import {NgZone} from '@angular/core';

/*
  Generated class for the Homepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',

})
export class ChatPage {



    socket: any;
    chats: any;
    zone: any;
    chatinp: any;

    static get parameters() {
        return [NgZone];
    }
    constructor(ngzone) {
        this.zone = ngzone;
        this.chats = [];
        this.chatinp = '';
        this.socket = io('http://localhost:3000');
        this.socket.on('message', (msg) => {
            this.zone.run(() => {
                this.chats.push(msg);
            });
        });
    }

    send(msg) {
        if (msg != '') {
            this.socket.emit('message', msg);
        }
        this.chatinp = '';
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatPage');
    }


}
