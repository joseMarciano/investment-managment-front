import SockJS from 'sockjs-client';
import { Client, Frame, Message, over, Subscription } from 'stompjs';

export class SockJs {
    private static instance: SockJs
    private subscribers = new Map<string, string>();
    private pendingSubscribers = new Map<string, (message?: Message) => void>();
    private stompClient = null as unknown as Client;
    private sockJs: any

    private constructor() {
        this.init();
    }

    static getInstance() {
        if (!SockJs.instance) {
            SockJs.instance = new SockJs()
        }

        return SockJs.instance
    }

    private init(): void {
        try {
            this.sockJs = new SockJS(`${process.env.REACT_APP_INVESTMENT_CALCULATOR}/websocket`);
            this.stompClient = over(this.sockJs);
            this.connect();
            this.stompClient.debug = () => { }; // TODO: Review this. It was necessary to stop debug llogs
        } catch (error) {
            console.error(error)
        }
    }

    private connect(): void {
        if (!this.stompClient || !this.stompClient.connected) {
            this.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this));
            return;
        }
    }

    public subscribe(destination: string, resolve: (message?: Message) => void): void {
        if (!this.stompClient || !this.stompClient.connected) {
            this.pendingSubscribers.set(destination, resolve)
            console.warn('WS is not connected!!', this.pendingSubscribers)
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
        for (const iterator of this.pendingSubscribers) {
            const destination = iterator[0];
            const resolve = iterator[1];
            this.subscribe(destination, resolve);
            this.pendingSubscribers.delete(destination);
        }
        console.log('Connected: ' + frame);
    }

    private onError(frame: Frame | string): void {
        console.warn('Error: ' + frame);
        setTimeout(() => this.init(), 10000);
    }
}