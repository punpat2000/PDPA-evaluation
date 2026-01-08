import { Fragment, memo } from 'react';
import TwitterBtn from './TwitterBtn';
import FacebookBtn from './FacebookBtn';

const PlatformButtons = (props) => {
	const isTwitterSelected = props.platform === 'Twitter';
	const isFacebookSelected = props.platform === 'Facebook';

	const platformSelectHandler = (platform) => {
		props.onSelectPlatform(platform);
	};

	return (
		<Fragment>
			<TwitterBtn
				isSelected={isTwitterSelected}
				onSelectPlatform={platformSelectHandler}
			/>
			<FacebookBtn
				isSelected={isFacebookSelected}
				onSelectPlatform={platformSelectHandler}
			/>
		</Fragment>
	);
};

export default memo(PlatformButtons);
