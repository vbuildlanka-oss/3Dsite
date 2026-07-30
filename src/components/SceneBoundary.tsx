import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onFail: () => void;
};

type State = { failed: boolean };

/**
 * If WebGL is unavailable or the context is lost, the site must still work.
 * We drop the canvas, tell the app to release the preloader, and let the DOM
 * layer carry the whole experience.
 */
export class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[scene] falling back to the flat layout:', error.message, info.componentStack);
    this.props.onFail();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
