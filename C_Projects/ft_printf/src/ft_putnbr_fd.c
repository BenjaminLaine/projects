/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr_fd.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 20:20:33 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:49:27 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_putnbr_fd(long long n, int fd)
{
	char				str[30];
	int					z;
	unsigned long long	num;

	z = n < 0 ? 2 : 1;
	num = n < 0 ? -n : n;
	str[0] = z == 2 ? '-' : 1;
	while (((n > 0) || (n < 0)) && (n = n < 0 ? ((n * -1) / 10) : (n / 10)))
		z++;
	str[z] = '\0';
	while ((str[0] == '-' ? z > 1 : z > 0) && (str[--z] = ((num % 10) + 48)))
		num /= 10;
	ft_putstr_fd(str, fd);
}
