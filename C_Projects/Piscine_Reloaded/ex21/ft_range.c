/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_range.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/15 12:33:22 by blaine            #+#    #+#             */
/*   Updated: 2019/10/15 16:35:00 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int		*ft_range(int min, int max)
{
	int i;
	int num;
	int *array;

	i = 0;
	num = min;
	if (!(array = (int*)malloc(sizeof(int) * max - min)))
		return (NULL);
	if (min >= max)
		return (NULL);
	while (num < max)
	{
		array[i] = num;
		num++;
		i++;
	}
	return (array);
}
