'use client'

import { ReactCornerLink } from "solomaker-common-components";

export function CornerCom() {
	return (
		<>
			<ReactCornerLink
				url="https://github.com/kbmjj123/solo-tutorials"
				type="view-source"
				id="source-link"
			/>
			<ReactCornerLink
				url="https://solomakerstudio.com"
				type="built-by-solo"
				id="solo-link"
			/>
		</>
	)
}