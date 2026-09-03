import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User.types";
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, Schema<IUser, mongoose.Model<IUser, any, any, any, any, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    readonly URL?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly activeViewTransition?: mongoose.SchemaDefinitionProperty<ViewTransition | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    alinkColor?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly all?: mongoose.SchemaDefinitionProperty<HTMLAllCollection, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly anchors?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLAnchorElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly applets?: mongoose.SchemaDefinitionProperty<HTMLCollection, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    bgColor?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    body?: mongoose.SchemaDefinitionProperty<HTMLElement, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly characterSet?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly charset?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly compatMode?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly contentType?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    cookie?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly currentScript?: mongoose.SchemaDefinitionProperty<HTMLOrSVGScriptElement | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly defaultView?: mongoose.SchemaDefinitionProperty<(Window & typeof globalThis) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    designMode?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    dir?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly doctype?: mongoose.SchemaDefinitionProperty<DocumentType | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly documentElement?: mongoose.SchemaDefinitionProperty<HTMLElement, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly documentURI?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    domain?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly embeds?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLEmbedElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    fgColor?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly forms?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLFormElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly fragmentDirective?: mongoose.SchemaDefinitionProperty<FragmentDirective, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly fullscreen?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly fullscreenEnabled?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly head?: mongoose.SchemaDefinitionProperty<HTMLHeadElement, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly hidden?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly images?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLImageElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly implementation?: mongoose.SchemaDefinitionProperty<DOMImplementation, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly inputEncoding?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly lastModified?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    linkColor?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly links?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    location?: mongoose.SchemaDefinitionProperty<Location, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onfullscreenchange?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onfullscreenerror?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerlockchange?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerlockerror?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onreadystatechange?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onvisibilitychange?: mongoose.SchemaDefinitionProperty<((this: Document, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ownerDocument?: mongoose.SchemaDefinitionProperty<null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly pictureInPictureEnabled?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly plugins?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLEmbedElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly readyState?: mongoose.SchemaDefinitionProperty<DocumentReadyState, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly referrer?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly rootElement?: mongoose.SchemaDefinitionProperty<SVGSVGElement | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly scripts?: mongoose.SchemaDefinitionProperty<HTMLCollectionOf<HTMLScriptElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly scrollingElement?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly timeline?: mongoose.SchemaDefinitionProperty<DocumentTimeline, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    title?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly visibilityState?: mongoose.SchemaDefinitionProperty<DocumentVisibilityState, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    vlinkColor?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    adoptNode?: mongoose.SchemaDefinitionProperty<<T extends Node>(node: T) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    captureEvents?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    caretPositionFromPoint?: mongoose.SchemaDefinitionProperty<(x: number, y: number, options?: CaretPositionFromPointOptions) => CaretPosition | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    caretRangeFromPoint?: mongoose.SchemaDefinitionProperty<(x: number, y: number) => Range | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    clear?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    close?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createAttribute?: mongoose.SchemaDefinitionProperty<(localName: string) => Attr, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createAttributeNS?: mongoose.SchemaDefinitionProperty<(namespace: string | null, qualifiedName: string) => Attr, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createCDATASection?: mongoose.SchemaDefinitionProperty<(data: string) => CDATASection, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createComment?: mongoose.SchemaDefinitionProperty<(data: string) => Comment, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createDocumentFragment?: mongoose.SchemaDefinitionProperty<() => DocumentFragment, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createElement?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
        <K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
        (tagName: string, options?: ElementCreationOptions): HTMLElement;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createElementNS?: mongoose.SchemaDefinitionProperty<{
        (namespaceURI: "http://www.w3.org/1999/xhtml", qualifiedName: string): HTMLElement;
        <K extends keyof SVGElementTagNameMap>(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: K): SVGElementTagNameMap[K];
        (namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement;
        <K extends keyof MathMLElementTagNameMap>(namespaceURI: "http://www.w3.org/1998/Math/MathML", qualifiedName: K): MathMLElementTagNameMap[K];
        (namespaceURI: "http://www.w3.org/1998/Math/MathML", qualifiedName: string): MathMLElement;
        (namespaceURI: string | null, qualifiedName: string, options?: ElementCreationOptions): Element;
        (namespace: string | null, qualifiedName: string, options?: string | ElementCreationOptions): Element;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createEvent?: mongoose.SchemaDefinitionProperty<{
        (eventInterface: "AnimationEvent"): AnimationEvent;
        (eventInterface: "AnimationPlaybackEvent"): AnimationPlaybackEvent;
        (eventInterface: "AudioProcessingEvent"): AudioProcessingEvent;
        (eventInterface: "BeforeUnloadEvent"): BeforeUnloadEvent;
        (eventInterface: "BlobEvent"): BlobEvent;
        (eventInterface: "ClipboardEvent"): ClipboardEvent;
        (eventInterface: "CloseEvent"): CloseEvent;
        (eventInterface: "CommandEvent"): CommandEvent;
        (eventInterface: "CompositionEvent"): CompositionEvent;
        (eventInterface: "ContentVisibilityAutoStateChangeEvent"): ContentVisibilityAutoStateChangeEvent;
        (eventInterface: "CookieChangeEvent"): CookieChangeEvent;
        (eventInterface: "CustomEvent"): CustomEvent;
        (eventInterface: "DeviceMotionEvent"): DeviceMotionEvent;
        (eventInterface: "DeviceOrientationEvent"): DeviceOrientationEvent;
        (eventInterface: "DragEvent"): DragEvent;
        (eventInterface: "ErrorEvent"): ErrorEvent;
        (eventInterface: "Event"): Event;
        (eventInterface: "Events"): Event;
        (eventInterface: "FocusEvent"): FocusEvent;
        (eventInterface: "FontFaceSetLoadEvent"): FontFaceSetLoadEvent;
        (eventInterface: "FormDataEvent"): FormDataEvent;
        (eventInterface: "GPUUncapturedErrorEvent"): GPUUncapturedErrorEvent;
        (eventInterface: "GamepadEvent"): GamepadEvent;
        (eventInterface: "HashChangeEvent"): HashChangeEvent;
        (eventInterface: "IDBVersionChangeEvent"): IDBVersionChangeEvent;
        (eventInterface: "InputEvent"): InputEvent;
        (eventInterface: "KeyboardEvent"): KeyboardEvent;
        (eventInterface: "MIDIConnectionEvent"): MIDIConnectionEvent;
        (eventInterface: "MIDIMessageEvent"): MIDIMessageEvent;
        (eventInterface: "MediaEncryptedEvent"): MediaEncryptedEvent;
        (eventInterface: "MediaKeyMessageEvent"): MediaKeyMessageEvent;
        (eventInterface: "MediaQueryListEvent"): MediaQueryListEvent;
        (eventInterface: "MediaStreamTrackEvent"): MediaStreamTrackEvent;
        (eventInterface: "MessageEvent"): MessageEvent;
        (eventInterface: "MouseEvent"): MouseEvent;
        (eventInterface: "MouseEvents"): MouseEvent;
        (eventInterface: "NavigateEvent"): NavigateEvent;
        (eventInterface: "NavigationCurrentEntryChangeEvent"): NavigationCurrentEntryChangeEvent;
        (eventInterface: "OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
        (eventInterface: "PageRevealEvent"): PageRevealEvent;
        (eventInterface: "PageSwapEvent"): PageSwapEvent;
        (eventInterface: "PageTransitionEvent"): PageTransitionEvent;
        (eventInterface: "PaymentMethodChangeEvent"): PaymentMethodChangeEvent;
        (eventInterface: "PaymentRequestUpdateEvent"): PaymentRequestUpdateEvent;
        (eventInterface: "PictureInPictureEvent"): PictureInPictureEvent;
        (eventInterface: "PointerEvent"): PointerEvent;
        (eventInterface: "PopStateEvent"): PopStateEvent;
        (eventInterface: "ProgressEvent"): ProgressEvent;
        (eventInterface: "PromiseRejectionEvent"): PromiseRejectionEvent;
        (eventInterface: "RTCDTMFToneChangeEvent"): RTCDTMFToneChangeEvent;
        (eventInterface: "RTCDataChannelEvent"): RTCDataChannelEvent;
        (eventInterface: "RTCErrorEvent"): RTCErrorEvent;
        (eventInterface: "RTCPeerConnectionIceErrorEvent"): RTCPeerConnectionIceErrorEvent;
        (eventInterface: "RTCPeerConnectionIceEvent"): RTCPeerConnectionIceEvent;
        (eventInterface: "RTCTrackEvent"): RTCTrackEvent;
        (eventInterface: "SecurityPolicyViolationEvent"): SecurityPolicyViolationEvent;
        (eventInterface: "SpeechRecognitionErrorEvent"): SpeechRecognitionErrorEvent;
        (eventInterface: "SpeechRecognitionEvent"): SpeechRecognitionEvent;
        (eventInterface: "SpeechSynthesisErrorEvent"): SpeechSynthesisErrorEvent;
        (eventInterface: "SpeechSynthesisEvent"): SpeechSynthesisEvent;
        (eventInterface: "StorageEvent"): StorageEvent;
        (eventInterface: "SubmitEvent"): SubmitEvent;
        (eventInterface: "TaskPriorityChangeEvent"): TaskPriorityChangeEvent;
        (eventInterface: "TextEvent"): TextEvent;
        (eventInterface: "ToggleEvent"): ToggleEvent;
        (eventInterface: "TouchEvent"): TouchEvent;
        (eventInterface: "TrackEvent"): TrackEvent;
        (eventInterface: "TransitionEvent"): TransitionEvent;
        (eventInterface: "UIEvent"): UIEvent;
        (eventInterface: "UIEvents"): UIEvent;
        (eventInterface: "WebGLContextEvent"): WebGLContextEvent;
        (eventInterface: "WheelEvent"): WheelEvent;
        (eventInterface: string): Event;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createNodeIterator?: mongoose.SchemaDefinitionProperty<(root: Node, whatToShow?: number, filter?: NodeFilter | null) => NodeIterator, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createProcessingInstruction?: mongoose.SchemaDefinitionProperty<(target: string, data: string) => ProcessingInstruction, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createRange?: mongoose.SchemaDefinitionProperty<() => Range, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createTextNode?: mongoose.SchemaDefinitionProperty<(data: string) => Text, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createTreeWalker?: mongoose.SchemaDefinitionProperty<(root: Node, whatToShow?: number, filter?: NodeFilter | null) => TreeWalker, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    execCommand?: mongoose.SchemaDefinitionProperty<(commandId: string, showUI?: boolean, value?: string) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    exitFullscreen?: mongoose.SchemaDefinitionProperty<() => Promise<void>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    exitPictureInPicture?: mongoose.SchemaDefinitionProperty<() => Promise<void>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    exitPointerLock?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getElementById?: mongoose.SchemaDefinitionProperty<(elementId: string) => HTMLElement | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getElementsByClassName?: mongoose.SchemaDefinitionProperty<(classNames: string) => HTMLCollectionOf<Element>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getElementsByName?: mongoose.SchemaDefinitionProperty<(elementName: string) => NodeListOf<HTMLElement>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getElementsByTagName?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
        (qualifiedName: string): HTMLCollectionOf<Element>;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getElementsByTagNameNS?: mongoose.SchemaDefinitionProperty<{
        (namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        (namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        (namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getSelection?: mongoose.SchemaDefinitionProperty<() => Selection | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    hasFocus?: mongoose.SchemaDefinitionProperty<() => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    hasStorageAccess?: mongoose.SchemaDefinitionProperty<() => Promise<boolean>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    importNode?: mongoose.SchemaDefinitionProperty<<T extends Node>(node: T, options?: boolean | ImportNodeOptions) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    open?: mongoose.SchemaDefinitionProperty<{
        (unused1?: string, unused2?: string): Document;
        (url: string | URL, name: string, features: string): WindowProxy | null;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    queryCommandEnabled?: mongoose.SchemaDefinitionProperty<(commandId: string) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    queryCommandIndeterm?: mongoose.SchemaDefinitionProperty<(commandId: string) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    queryCommandState?: mongoose.SchemaDefinitionProperty<(commandId: string) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    queryCommandSupported?: mongoose.SchemaDefinitionProperty<(commandId: string) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    queryCommandValue?: mongoose.SchemaDefinitionProperty<(commandId: string) => string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    releaseEvents?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    requestStorageAccess?: mongoose.SchemaDefinitionProperty<() => Promise<void>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    startViewTransition?: mongoose.SchemaDefinitionProperty<(callbackOptions?: ViewTransitionUpdateCallback | StartViewTransitionOptions) => ViewTransition, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    write?: mongoose.SchemaDefinitionProperty<(...text: string[]) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    writeln?: mongoose.SchemaDefinitionProperty<(...text: string[]) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly textContent?: mongoose.SchemaDefinitionProperty<null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    addEventListener?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeEventListener?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly activeElement?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    adoptedStyleSheets?: mongoose.SchemaDefinitionProperty<CSSStyleSheet[], IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly customElementRegistry?: mongoose.SchemaDefinitionProperty<CustomElementRegistry | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly fullscreenElement?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly pictureInPictureElement?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly pointerLockElement?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly styleSheets?: mongoose.SchemaDefinitionProperty<StyleSheetList, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    elementFromPoint?: mongoose.SchemaDefinitionProperty<(x: number, y: number) => Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    elementsFromPoint?: mongoose.SchemaDefinitionProperty<(x: number, y: number) => Element[], IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAnimations?: mongoose.SchemaDefinitionProperty<() => Animation[], IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    dispatchEvent?: mongoose.SchemaDefinitionProperty<(event: Event) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly fonts?: mongoose.SchemaDefinitionProperty<FontFaceSet, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onabort?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: UIEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onanimationcancel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onanimationend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onanimationiteration?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onanimationstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onauxclick?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onbeforeinput?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: InputEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onbeforematch?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onbeforetoggle?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onblur?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncancel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncanplay?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncanplaythrough?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onchange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onclick?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onclose?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncommand?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncontextlost?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncontextmenu?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncontextrestored?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncopy?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncuechange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oncut?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondblclick?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondrag?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondragend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondragenter?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondragleave?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondragover?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondragstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondrop?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: DragEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ondurationchange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onemptied?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onended?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onerror?: mongoose.SchemaDefinitionProperty<OnErrorEventHandler, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onfocus?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onformdata?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ongotpointercapture?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oninput?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: InputEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    oninvalid?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onkeydown?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onkeypress?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onkeyup?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onload?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onloadeddata?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onloadedmetadata?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onloadstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onlostpointercapture?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmousedown?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmouseenter?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmouseleave?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmousemove?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmouseout?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmouseover?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onmouseup?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpaste?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpause?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onplay?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onplaying?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointercancel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerdown?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerenter?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerleave?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointermove?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerout?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerover?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerrawupdate?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onpointerup?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onprogress?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onratechange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onreset?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onresize?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: UIEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onscroll?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onscrollend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onsecuritypolicyviolation?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onseeked?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onseeking?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onselect?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onselectionchange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onselectstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onslotchange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onstalled?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onsubmit?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onsuspend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontimeupdate?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontoggle?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: ToggleEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontouchcancel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontouchend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontouchmove?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontouchstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontransitioncancel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontransitionend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontransitionrun?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ontransitionstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onvolumechange?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwaiting?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwebkitanimationend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwebkitanimationiteration?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwebkitanimationstart?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwebkittransitionend?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: Event) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    onwheel?: mongoose.SchemaDefinitionProperty<((this: GlobalEventHandlers, ev: WheelEvent) => any) | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly baseURI?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly childNodes?: mongoose.SchemaDefinitionProperty<NodeListOf<ChildNode>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly firstChild?: mongoose.SchemaDefinitionProperty<ChildNode | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly isConnected?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly lastChild?: mongoose.SchemaDefinitionProperty<ChildNode | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly nextSibling?: mongoose.SchemaDefinitionProperty<ChildNode | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly nodeName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly nodeType?: mongoose.SchemaDefinitionProperty<number, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    nodeValue?: mongoose.SchemaDefinitionProperty<string | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly parentElement?: mongoose.SchemaDefinitionProperty<HTMLElement | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly parentNode?: mongoose.SchemaDefinitionProperty<ParentNode | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly previousSibling?: mongoose.SchemaDefinitionProperty<ChildNode | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    appendChild?: mongoose.SchemaDefinitionProperty<<T extends Node>(node: T) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    cloneNode?: mongoose.SchemaDefinitionProperty<(subtree?: boolean) => Node, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    compareDocumentPosition?: mongoose.SchemaDefinitionProperty<(other: Node) => number, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    contains?: mongoose.SchemaDefinitionProperty<(other: Node | null) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getRootNode?: mongoose.SchemaDefinitionProperty<(options?: GetRootNodeOptions) => Node, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    hasChildNodes?: mongoose.SchemaDefinitionProperty<() => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    insertBefore?: mongoose.SchemaDefinitionProperty<<T extends Node>(node: T, child: Node | null) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isDefaultNamespace?: mongoose.SchemaDefinitionProperty<(namespace: string | null) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isEqualNode?: mongoose.SchemaDefinitionProperty<(otherNode: Node | null) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isSameNode?: mongoose.SchemaDefinitionProperty<(otherNode: Node | null) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    lookupNamespaceURI?: mongoose.SchemaDefinitionProperty<(prefix: string | null) => string | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    lookupPrefix?: mongoose.SchemaDefinitionProperty<(namespace: string | null) => string | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    normalize?: mongoose.SchemaDefinitionProperty<() => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeChild?: mongoose.SchemaDefinitionProperty<<T extends Node>(child: T) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    replaceChild?: mongoose.SchemaDefinitionProperty<<T extends Node>(node: Node, child: T) => T, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ELEMENT_NODE?: mongoose.SchemaDefinitionProperty<1, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ATTRIBUTE_NODE?: mongoose.SchemaDefinitionProperty<2, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly TEXT_NODE?: mongoose.SchemaDefinitionProperty<3, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly CDATA_SECTION_NODE?: mongoose.SchemaDefinitionProperty<4, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ENTITY_REFERENCE_NODE?: mongoose.SchemaDefinitionProperty<5, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly ENTITY_NODE?: mongoose.SchemaDefinitionProperty<6, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly PROCESSING_INSTRUCTION_NODE?: mongoose.SchemaDefinitionProperty<7, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly COMMENT_NODE?: mongoose.SchemaDefinitionProperty<8, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_NODE?: mongoose.SchemaDefinitionProperty<9, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_TYPE_NODE?: mongoose.SchemaDefinitionProperty<10, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_FRAGMENT_NODE?: mongoose.SchemaDefinitionProperty<11, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly NOTATION_NODE?: mongoose.SchemaDefinitionProperty<12, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_DISCONNECTED?: mongoose.SchemaDefinitionProperty<1, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_PRECEDING?: mongoose.SchemaDefinitionProperty<2, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_FOLLOWING?: mongoose.SchemaDefinitionProperty<4, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_CONTAINS?: mongoose.SchemaDefinitionProperty<8, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_CONTAINED_BY?: mongoose.SchemaDefinitionProperty<16, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC?: mongoose.SchemaDefinitionProperty<32, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly childElementCount?: mongoose.SchemaDefinitionProperty<number, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly children?: mongoose.SchemaDefinitionProperty<HTMLCollection, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly firstElementChild?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    readonly lastElementChild?: mongoose.SchemaDefinitionProperty<Element | null, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    append?: mongoose.SchemaDefinitionProperty<(...nodes: (Node | string)[]) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    moveBefore?: mongoose.SchemaDefinitionProperty<(node: Node, child: Node | null) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    prepend?: mongoose.SchemaDefinitionProperty<(...nodes: (Node | string)[]) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    querySelector?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
        <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
        <E extends Element = Element>(selectors: string): E | null;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    querySelectorAll?: mongoose.SchemaDefinitionProperty<{
        <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
        <K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
        <K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
        <K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
        <E extends Element = Element>(selectors: string): NodeListOf<E>;
    }, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    replaceChildren?: mongoose.SchemaDefinitionProperty<(...nodes: (Node | string)[]) => void, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createExpression?: mongoose.SchemaDefinitionProperty<(expression: string, resolver?: XPathNSResolver | null) => XPathExpression, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createNSResolver?: mongoose.SchemaDefinitionProperty<(nodeResolver: Node) => Node, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    evaluate?: mongoose.SchemaDefinitionProperty<(expression: string, contextNode: Node, resolver?: XPathNSResolver | null, type?: number, result?: XPathResult | null) => XPathResult, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    id?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    FirstName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    LastName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleId?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    facebookId?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    completedOnboarding?: mongoose.SchemaDefinitionProperty<boolean | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    joinedDate?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    lastActiveDate?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, IUser>, IUser>;
export default _default;
//# sourceMappingURL=userModel.d.ts.map