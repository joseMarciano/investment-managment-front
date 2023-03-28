import SockJS from 'sockjs-client';
import { Client, Frame, Message, over, Subscription } from 'stompjs';

export class SockJs {
    private static instance: SockJs
    private subscribers = new Map<string, string>();
    private stompClient = null as unknown as Client;
    private sockJs: any

    private constructor() {
        this.connect();
    }

    static getInstance() {
        if (!SockJs.instance) {
            SockJs.instance = new SockJs()
        }

        return SockJs.instance
    }

    private connect(): void {
        try {
            this.sockJs = new SockJS(`${process.env.REACT_APP_INVESTMENT_CALCULATOR}/websocket`);
            this.stompClient = over(this.sockJs);
            this.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this));
            this.stompClient.debug = () => { }; // TODO: Review this. It was necessary to stop debug llogs
        } catch (error) {
            console.error(error)
        }
    }

    public subscribe(destination: string, resolve: (message?: Message) => void): void {
        if (!this.stompClient || !this.stompClient.connected) {
            console.warn('WS is not connected!!')
            return;
        }

        this.unsubscribe(destination)
        const { id } = this.stompSubscribe(destination, resolve)
        this.subscribers.set(destination, id)
    }

    public unsubscribe(id: string) {
        this.subscribers.has(id) && this.stompClient.unsubscribe(this.subscribers.get(id) as string);
        this.subscribers.delete(id);
    }

    public send(destination: string, { body }: { body: any }) {
        if (!this.stompClient || !this.stompClient.connected) {
            console.warn('WS is not connected!!')
            return;
        }

        this.stompClient.send(destination, {}, JSON.stringify(body || {}))
    }



    private stompSubscribe(destination: string, resolve: (message?: Message) => void): Subscription {
        return this.stompClient.subscribe(destination, (message) => {
            resolve(message)
            console.log(`Received from ${destination}`, message.body)
        });
    }


    private onConnected(frame?: Frame): void {
        console.log('Connected: ' + frame);
    }

    private onError(frame: Frame | string): void {
        console.warn('Error: ' + frame);
    }
}