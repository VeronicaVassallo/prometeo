/*Custom hook che arrotonda per per difetto l'ora corrente, e mi restituisca 
l'oggetto { time, ex:weatherCode }, il cui time è corrispondente*/
import { useState, useEffect } from "react";

export const useGetCurrentInfo = (list) => {
	const [currentItemList, setCurrentItemList] = useState(null);

	useEffect(() => {
		if (list && list.length > 0) {
			const now = new Date();
			now.setMinutes(0, 0, 0);
			const currentHour = now.toISOString().slice(0, 16);
			const foundItem = list.find((item) => item.time === currentHour);
			setCurrentItemList(foundItem || null);
		}
	}, [list]);

	return currentItemList;
};
