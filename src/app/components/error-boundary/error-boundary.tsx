import {Component} from "react";

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<any, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any) {
        return {hasError: true}
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
