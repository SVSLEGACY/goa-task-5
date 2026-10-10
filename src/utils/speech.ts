// Web Speech Recognition Wrapper

export interface SpeechHandlerProps {
  onTranscriptChange: (transcript: string) => void;
  onStateChange?: (isListening: boolean) => void;
  onError?: (errorMessage: string) => void;
}

export class SpeechHandler {
  private recognition: any = null;
  private isListening = false;
  private onTranscriptChange: (transcript: string) => void;
  private onStateChange?: (isListening: boolean) => void;
  private onError?: (errorMessage: string) => void;

  constructor({ onTranscriptChange, onStateChange, onError }: SpeechHandlerProps) {
    this.onTranscriptChange = onTranscriptChange;
    this.onStateChange = onStateChange;
    this.onError = onError;

    this.initRecognition();
  }

  public isSpeechSupported(): boolean {
    return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }

  private initRecognition() {
    if (!this.isSpeechSupported()) {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = navigator.language || 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.onStateChange?.(true);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onStateChange?.(false);
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      this.isListening = false;
      this.onStateChange?.(false);

      if (event.error === 'not-allowed') {
        this.onError?.('Microphone access was denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'no-speech') {
        // No speech detected, not fatal
      } else {
        this.onError?.(`Speech recognition error: ${event.error}`);
      }
    };

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const full = (final || interim).trim();
      if (full) {
        this.onTranscriptChange(full);
      }
    };
  }

  public start() {
    if (!this.recognition) {
      this.initRecognition();
    }
    if (!this.recognition) {
      this.onError?.('Speech recognition is not supported in this browser. You can type or use sample trips.');
      return;
    }

    try {
      this.recognition.start();
    } catch (e: any) {
      console.warn('Recognition start caught error:', e);
      if (e.name !== 'InvalidStateError') {
        this.onError?.('Could not activate microphone.');
      }
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Recognition stop error:', e);
      }
    }
    this.isListening = false;
    this.onStateChange?.(false);
  }

  public toggle(): boolean {
    if (this.isListening) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}
