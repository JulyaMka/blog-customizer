import { StrictMode, CSSProperties, useState } from 'react';
import styles from './styles/index.module.scss';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

export const App = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const updatingSettings = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentSettings={settings}
				onApply={updatingSettings}
			/>
			<Article />
		</main>
	);
};