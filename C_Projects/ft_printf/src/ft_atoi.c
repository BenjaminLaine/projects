/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/18 19:41:50 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:52:21 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int		ft_atoi(const char *s)
{
	int			sign;
	long long	result;

	result = 0;
	sign = 1;
	while (ft_isspace(*s))
		s++;
	if (*s == '+' || *s == '-')
		sign = *((char*)s++) == '-' ? -1 : 1;
	while (ft_isdigit(*s))
		result = result * 10 + (*((char*)s++) - '0');
	return (result * sign);
}
