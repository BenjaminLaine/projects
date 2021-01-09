/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 19:49:19 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:51:26 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_itoa(long long n)
{
	char				*str;
	unsigned long long	z[3];

	z[2] = 1;
	z[1] = n < 0 ? 1 : 0;
	z[0] = n < 0 ? -n : n;
	while (((n > 0) || (n < 0)) && (n = n < 0 ? ((n * -1) / 10) : (n / 10)))
		z[2]++;
	if (!(str = ft_strnew(z[2] + z[1])))
		return (NULL);
	while ((z[2]-- + z[1] > 0) && (str[z[2] + z[1]] = ((z[0] % 10) + 48)))
		z[0] /= 10;
	z[1] == 1 ? str[0] = '-' : 1;
	return (str);
}
