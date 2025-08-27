// ErrorBoundary.js
import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // State'i güncelle ki bir sonraki render'da fallback UI gösterilsin
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('🔴 ERROR BOUNDARY CAUGHT:');
        console.log('Error:', error);
        console.log('Error message:', error.message);
        console.log('Error stack:', error.stack);
        console.log('Component stack:', errorInfo.componentStack);
        console.log('================================');

        this.setState({
            error: error,
            errorInfo: errorInfo,
        });

        // Buraya crash analytics gönderebilirsiniz
        // crashlytics().recordError(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f8f8' }}>
                    <ScrollView>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                            Ups! Bir hata oluştu
                        </Text>

                        <Text style={{ fontSize: 16, marginBottom: 15, color: '#666' }}>
                            Uygulama beklenmeyen bir hatayla karşılaştı.
                        </Text>

                        <Button
                            title="Yeniden Dene"
                            onPress={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                        />

                        {__DEV__ && this.state.error && (
                            <View style={{ marginTop: 20, padding: 10, backgroundColor: '#ffebee' }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                                    Hata Detayları (Dev Mode):
                                </Text>
                                <Text style={{ fontSize: 12, color: '#d32f2f' }}>
                                    {this.state.error.toString()}
                                </Text>
                                <Text style={{ fontSize: 10, color: '#666', marginTop: 10 }}>
                                    {this.state.errorInfo.componentStack}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;