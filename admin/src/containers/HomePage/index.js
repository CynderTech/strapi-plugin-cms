/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';

import { Header } from '@buffetjs/custom';
import styled from 'styled-components';

const Container = styled.div`
	padding: 18px 30px;
`;

const HomePage = () => {
	return (
		<Container>
			<Header
				title={{
					label: 'CMS',
				}}
			/>
		</Container>
	);
};

export default memo(HomePage);
