/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_isupper.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/28 22:27:27 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:51:34 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int		ft_isupper(int i)
{
	if (i <= 'Z' && i >= 'A')
		return (1);
	return (0);
}
