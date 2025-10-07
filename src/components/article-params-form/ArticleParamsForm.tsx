import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';
//import { FormatSizeTwoTone } from '@mui/icons-material';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	onApply: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formSettings, setformSettings] = useState(currentSettings);

	useEffect(() => {
		setformSettings(currentSettings);
	}, [currentSettings]);

	useOutsideClickClose({
		isOpen: isOpenMenu,
		rootRef: formRef,
		onChange: setIsOpenMenu,
		onClose: () => setIsOpenMenu(false),
	});

	const handleFormSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		onApply(formSettings);
		setIsOpenMenu(false);
	};

	const handleFormReset = () => {
		setformSettings(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpenMenu(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpenMenu}
				onClick={() => setIsOpenMenu(!isOpenMenu)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpenMenu,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setformSettings({ ...formSettings, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formSettings.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setformSettings({ ...formSettings, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formSettings.fontColor}
						options={fontColors}
						onChange={(option) =>
							setformSettings({ ...formSettings, fontColor: option })
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formSettings.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setformSettings({ ...formSettings, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setformSettings({ ...formSettings, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
