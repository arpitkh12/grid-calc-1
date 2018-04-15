import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'expo';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			length: "0",
			width: "0",
			angle: 0,
			mainT: 0,
			crossT4: 0,
			crossT2: 0,
			tile2x2: 0,
			tile2x4: 0
		};
	}

	calculateEstimate(length, width) {

		var m = 0;
		var sqft = 0;
		if (length !== 0 && width !== 0) {
			sqft = length * width;
		}
		var mainT = Math.round((sqft / 48) * 100) / 100;
		var crossT4 = Math.round((sqft / 8) * 100) / 100;
		var tile2x2 = Math.round((sqft / 4) * 100) / 100;
		var tile2x4 = Math.round((sqft / 8) * 100) / 100;
		var angle = (2 * (parseInt(length) + parseInt(width))) / 10;

		var crossT2 = 0;
		var g = 0;
		if (parseInt(g, 10) !== 8) {
			crossT2 = parseInt(crossT4, 10)
		}
		this.setState({ angle: angle })
		this.setState({ mainT: mainT });
		this.setState({ crossT2: crossT2 });
		this.setState({ crossT4: crossT4 });
		this.setState({ tile2x2: tile2x2 });
		this.setState({ tile2x4: tile2x4 });
	}

	bannerError() {
		console.log('An error');
		return;
	}

	componentDidMount() {
		AdMobInterstitial.setTestDeviceID('EMULATOR');
		// ALWAYS USE TEST ID for Admob ads
		AdMobInterstitial.setAdUnitID('ca-app-pub-9346620781412994/9745783618');

		AdMobInterstitial.addEventListener('interstitialDidLoad',
			() => console.log('interstitialDidLoad')
		);

		AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
			() => console.log('interstitialDidFailToLoad')
		);

		AdMobInterstitial.addEventListener('interstitialDidOpen',
			() => console.log('interstitialDidOpen')
		);
		AdMobInterstitial.addEventListener('interstitialDidClose',
			() => console.log('interstitialDidClose')
		);
		AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
			() => console.log('interstitialWillLeaveApplication')
		);
		// this.showInterstitial();
	}

	componentWillUnmount() {
		AdMobInterstitial.removeAllListeners();
	}

	showInterstitial() {
		AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
	}

	render() {
		return (

			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text adjustsFontSizeToFit={true} style={styles.header}>Ceiling Grid Calculator</Text>
				</View>
				<View style={styles.content}>
					<View style={styles.body}>
						<Text style={{ height: 30, color: 'brown' }}>Enter Length (ft)</Text>
						<Text style={{ color: 'brown' }}>Enter Width (ft)</Text>
					</View>
					<View style={styles.body}>
						<TextInput
							adjustsFontSizeToFit={true}
							style={{ textAlign: 'center', color: 'brown', height: 30, width: 130 }}
							onChangeText={(text) => this.setState({ width: text })}
							keyboardType={"numeric"}
							placeholder="0"
							placeholderTextColor="brown"
							underlineColorAndroid="brown"
						/>
						<TextInput
							adjustsFontSizeToFit={true}
							style={{ textAlign: 'center', color: 'brown', height: 30, width: 130 }}
							onChangeText={(text) => this.setState({ length: text })}
							keyboardType={"numeric"}
							placeholder="0"
							placeholderTextColor="brown"
							underlineColorAndroid="brown"
						/>
					</View>
				</View>
				<Button
					onPress={() => this.calculateEstimate(this.state.length, this.state.width)}
					title="Calculate"
					color="burlywood"
				/>


				<View style={styles.content}>
					<View style={styles.body}>

						<Text style={styles.textColor}>Main T 12ft</Text>
						<Text style={styles.textColor}>Cross T 4ft</Text>
						<Text style={styles.textColor}>Cross T 2ft</Text>
						<Text style={styles.textColor}>Wall Angle 10ft</Text>
						<Text style={styles.textColor}>Tile 2x2</Text>

					</View>
					<View style={styles.body}>
						<Text style={styles.textColor}>{this.state.mainT}</Text>
						<Text style={styles.textColor}>{this.state.crossT4}</Text>
						<Text style={styles.textColor}>{this.state.crossT2}</Text>
						<Text style={styles.textColor}>{this.state.angle}</Text>
						<Text style={styles.textColor}>{this.state.tile2x2}</Text>

					</View>
				</View>

				<AdMobBanner
					style={styles.bottomBanner}
					bannerSize="fullBanner"
					adUnitID="ca-app-pub-9346620781412994/6687966319"
					testDeviceID="EMULATOR"
					didFailToReceiveAdWithError={this.bannerError} />
			</View >
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	textColor: {
		color: 'brown'
	},
	content: {
		paddingTop: 40,
		flexDirection: 'row',
		paddingLeft: 30,
		flex: 1
	},
	headerContainer: {
		flex: 0.5
	},
	header: {
		fontSize: 30,
		fontFamily: 'Roboto',
		color: 'brown',
		top: 50
	},
	body: {
		flex: 1
	},
	bottomBanner: {
		position: 'relative',
		bottom: 0
	}
});