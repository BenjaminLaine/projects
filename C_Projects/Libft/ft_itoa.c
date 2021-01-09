/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 19:49:19 by blaine            #+#    #+#             */
/*   Updated: 2019/10/24 01:16:19 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_itoa(int n)
{
	int				count;
	int				negative;
	char			*str;
	unsigned int	number;

	count = 1;
	negative = n < 0 ? 1 : 0;
	number = n < 0 ? -n : n;
	while ((number > 0) && (number /= 10))
		count++;
	if (!(str = (char *)malloc(sizeof(char) * (count + 1 + negative))))
		return (NULL);
	str[count + negative] = '\0';
	number = n < 0 ? -n : n;
	while (count + negative >= 0)
	{
		count--;
		str[count + negative] = ((number % 10) + 48);
		number /= 10;
	}
	if (negative == 1)
		str[0] = '-';
	return (str);
}
